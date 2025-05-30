const clientId = '93eb18ace41343a9a74eea56bdb5af7a'
const redirectUri = 'http://127.0.0.1:5173/callback'
const redirectUriMobile = 'http://10.0.0.110:5173/callback'

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// Generate code verifier
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
// hash function using SHA256 algorithm to encode the verifier
const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}
  
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }


// Step 1: Initiate login (call this when user clicks login button)
export const initiateSpotifyLogin = async () => {
    const codeVerifier = generateRandomString(64);
    
    // Store code verifier for later use
    localStorage.setItem('code_verifier', codeVerifier);
    
    // Generate code challenge
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    
    // Build authorization URL
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };
    
    authUrl.search = new URLSearchParams(params).toString();
    
    // Redirect to Spotify for authorization
    window.location.href = authUrl.toString();
};
  

// Step 2: Handle callback and exchange code for token
export const handleSpotifyCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
        console.error('Spotify authorization error:', error);
        return { success: false, error };
    }
    
    if (!code) {
        console.error('No authorization code received');
        return { success: false, error: 'No authorization code' };
    }
    
    try {
        const token = await getToken(code);
        return { success: true, token };
    } catch (err) {
        console.error('Error getting token:', err);
        return { success: false, error: err.message };
    }
};

// Step 3: Exchange authorization code for access token
const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    
    if (!codeVerifier) {
        throw new Error('Code verifier not found in localStorage');
    }
    
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error_description || data.error || 'Token request failed');
    }
    
    // Store tokens
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
    }
    
    // Clean up code verifier
    localStorage.removeItem('code_verifier');
    
    return data;
};

// Utility function to get stored access token
export const getStoredAccessToken = () => {
    return localStorage.getItem('access_token');
};

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
    return !!getStoredAccessToken();
};