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
    console.log('🚀 Starting Spotify login process...');
    
    const codeVerifier = generateRandomString(64);
    console.log('✅ Generated code verifier:', codeVerifier.substring(0, 10) + '...');
    
    // Store code verifier for later use
    localStorage.setItem('code_verifier', codeVerifier);
    console.log('💾 Stored code verifier in localStorage');
    
    // Generate code challenge
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    console.log('🔐 Generated code challenge:', codeChallenge.substring(0, 10) + '...');
    
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
    console.log('🔗 Built authorization URL:', authUrl.toString());
    console.log('↗️ Redirecting to Spotify...');
    
    // Redirect to Spotify for authorization
    window.location.href = authUrl.toString();
};
  

// Step 2: Handle callback and exchange code for token
export const handleSpotifyCallback = async () => {
    console.log('🔄 Processing Spotify callback...');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    console.log('📝 URL params:', { code: code ? code.substring(0, 10) + '...' : null, error });
    
    if (error) {
        console.error('❌ Spotify authorization error:', error);
        return { success: false, error };
    }
    
    if (!code) {
        console.error('❌ No authorization code received');
        return { success: false, error: 'No authorization code' };
    }
    
    console.log('✅ Authorization code received, exchanging for token...');
    try {
        const token = await getToken(code);
        console.log('🎉 Successfully got access token!');
        return { success: true, token };
    } catch (err) {
        console.error('❌ Error getting token:', err);
        return { success: false, error: err.message };
    }
};

// Step 3: Exchange authorization code for access token
const getToken = async (code) => {
    console.log('🔐 Getting access token...');
    const codeVerifier = localStorage.getItem('code_verifier');
    
    if (!codeVerifier) {
        console.log('❌ Code verifier not found in localStorage');
        throw new Error('Code verifier not found in localStorage');
    }
    
    console.log('✅ Code verifier found in localStorage');
    
    const url = "https://accounts.spotify.com/api/token";
    console.log('📤 Making token request to:', url);
    
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
    console.log('📨 Token response status:', response.status);
    const data = await response.json();
    
    if (!response.ok) {
        console.error('❌ Token request failed:', data);
        throw new Error(data.error_description || data.error || 'Token request failed');
    }
    
    console.log('✅ Token request successful');
    
    // Store tokens
    console.log('🔍 Raw API response:', data);
    console.log('🔍 About to store:', {
        access_token: data.access_token ? 'RECEIVED' : 'MISSING FROM API',
        access_token_length: data.access_token?.length,
        refresh_token: data.refresh_token ? 'RECEIVED' : 'MISSING FROM API'
    });

    localStorage.setItem('access_token', data.access_token);
    console.log('💾 Stored access token in localStorage');

    // Immediately check what was stored
    const immediateCheck = localStorage.getItem('access_token');
    console.log('✅ Immediate verification:', immediateCheck ? 'SUCCESS' : 'FAILED');
    
    if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
        console.log('💾 Stored refresh token in localStorage');
    }
    
    // Clean up code verifier
    localStorage.removeItem('code_verifier');
    console.log('🧹 Removed code verifier from localStorage');
    
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