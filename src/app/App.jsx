import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Playlist from '../components/Playlist/Playlist'
import ExportMessage from './ExportMessage'
import SpotifyCallback from './SpotifyCallback'
import { initiateSpotifyLogin, isAuthenticated, getStoredAccessToken } from '../util/SpotifyAuth'

import { useState, useEffect } from 'react'

const tracksObject = {
  tracks:
    [
      {
        name: 'Safe',
        artist: 'Monkey Safari',
        album: 'Safe',
        image: 'https://f4.bcbits.com/img/a2256888722_10.jpg',
        id: '1',
        uri: 'spotify:track:7v2iUsHqHR1VNLODNUkTOz'
      },
      {
        name: 'Radiance',
        artist: 'Arodes, PÆDE',
        album: 'Radiancce',
        image: 'https://i1.sndcdn.com/artworks-aD8dX4b5r9af-0-t500x500.png',
        id: '2',
        uri: 'spotify:track:26Ei09sNb2GAUlKhSMb6n4'
      },
      {
        name: 'Better With You',
        artist: 'Daniel Allan, Port London',
        album: 'Better With You',
        image: 'https://i1.sndcdn.com/artworks-cVR4SsyIUrMr-0-t500x500.jpg',
        id: '3',
        uri: 'spotify:track:4tCOKaXWHABZ7siVyPIkME'
      },
      {
        name: 'EO',
        artist: 'sunflwr',
        album: 'EO',
        image: 'https://i1.sndcdn.com/artworks-V0Gp7DTEaiyIVXhR-dhuBvg-t500x500.png',
        id: '4',
        uri: 'spotify:track:4tCOKaXWHABZ7siVyPIkME'
      },
    ]
}

function App() {
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [playlistActive, setPlaylistActive] = useState(false)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [trackUris, setTrackUris] = useState([])
  const [exportMessage, setExportMessage] = useState('')
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false)
  const [pendingExport, setPendingExport] = useState(false)

  // Check if we're on the callback route
  const isCallbackRoute = window.location.pathname === '/callback'

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = isAuthenticated();
    console.log('🔍 Checking initial auth status:', authStatus);
    setIsSpotifyAuthenticated(authStatus);
    
    // Also log what's in localStorage
    console.log('🗄️ localStorage contents:', {
      access_token: localStorage.getItem('access_token') ? 'Present' : 'Missing',
      refresh_token: localStorage.getItem('refresh_token') ? 'Present' : 'Missing',
      code_verifier: localStorage.getItem('code_verifier') ? 'Present' : 'Missing'
    });
  }, [])

  // NEW: Add custom event listener for Spotify auth success
  useEffect(() => {
    const handleAuthSuccess = () => {
      console.log('🎉 Received auth success event, rechecking auth status...');
      const newAuthStatus = isAuthenticated();
      console.log('🔍 Auth recheck result:', newAuthStatus);
      
      if (newAuthStatus !== isSpotifyAuthenticated) {
        console.log('🔄 Auth status changed from', isSpotifyAuthenticated, 'to', newAuthStatus);
        setIsSpotifyAuthenticated(newAuthStatus);
        
        if (newAuthStatus && pendingExport) {
          console.log('🎯 Auth successful and export pending, proceeding with export...');
          proceedWithExport();
          setPendingExport(false);
        }
      }
    };

    // Listen for the custom event
    window.addEventListener('spotify-auth-success', handleAuthSuccess);
    
    return () => {
      window.removeEventListener('spotify-auth-success', handleAuthSuccess);
    };
  }, [isSpotifyAuthenticated, pendingExport]); // Dependencies to ensure we have latest state

  // NEW: Check for Spotify auth success URL parameter and show success message
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const spotifyAuthSuccess = urlParams.get('spotify_auth');
    
    if (spotifyAuthSuccess === 'success' && isSpotifyAuthenticated) {
      console.log('🎉 Spotify authorization successful, showing success message...');
      
      // Set your existing export message state
      setExportMessage('Spotify connected successfully!');
      
      // Clean up the URL parameter
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Clear message after 3 seconds - this will now properly trigger fade-out
      setTimeout(() => {
        console.log('🔍 Clearing success message after 3 seconds');
        setExportMessage('');
      }, 3000);
    }
  }, [isSpotifyAuthenticated]);

  useEffect(() => {
    console.log('🔍 exportMessage changed to:', exportMessage);
    if (exportMessage === '') {
      console.trace('🔍 exportMessage was cleared - here is the call stack:');
    }
  }, [exportMessage]);

  const handlePlaylistExport = async () => {
    console.log('🎵 Export button clicked!');
    console.log('📊 Current state:', {
      playlistTracks: playlistTracks.length,
      playlistName,
      isSpotifyAuthenticated
    });
    
    if (playlistTracks.length === 0) {
      console.log('❌ No tracks to export');
      alert('Add at least 1 track to export')
      return
    }

    // Check if user is authenticated with Spotify
    if (!isSpotifyAuthenticated) {
      console.log('🔐 User not authenticated, starting Spotify auth...');
      // Start Spotify auth flow
      try {
        console.log('🎯 About to call initiateSpotifyLogin...');
        setPendingExport(true);
        console.log('🎯 Set pendingExport to true');
        const result = await initiateSpotifyLogin()
        console.log('🎯 initiateSpotifyLogin completed:', result);
      } catch (error) {
        console.error('❌ Failed to initiate Spotify login:', error)
        console.error('❌ Error details:', error.message, error.stack);
        setExportMessage('Failed to connect to Spotify. Please try again.')
        setTimeout(() => setExportMessage(''), 3000)
      }
      return
    }

    console.log('✅ User is authenticated, proceeding with export...');
    // If authenticated, proceed with actual export
    await proceedWithExport()
  }

  const proceedWithExport = async () => {
    try {
      const accessToken = getStoredAccessToken()
      const uris = playlistTracks.map(track => track.uri)

      // Here you would implement the actual Spotify API calls
      // For now, we'll simulate the export
      console.log('Exporting to Spotify:', {
        playlistName,
        tracks: uris,
        accessToken: accessToken ? 'Present' : 'Missing'
      })

      // Simulate successful export
      setTrackUris(uris)
      setPlaylistName('')
      setPlaylistTracks([])
      setPlaylistActive(false)
      setExportMessage('Playlist exported to Spotify successfully!')
      
      setTimeout(() => setExportMessage(''), 3000)
    } catch (error) {
      console.error('Export failed:', error)
      setExportMessage('Failed to export playlist. Please try again.')
      setTimeout(() => setExportMessage(''), 3000)
    }
  }

  const handleTrackSelect = (track) => {
    setSelectedTrack(track)
  }

  // Reset selectedTrack after it's been added to the playlist
  useEffect(() => {
    if (selectedTrack) {
      const trackExists = playlistTracks.some(track => 
        track.name === selectedTrack.name && 
        track.artist === selectedTrack.artist && 
        track.album === selectedTrack.album
      );
      
      if (trackExists) {
        setSelectedTrack(null);
      }
    }
  }, [playlistTracks, selectedTrack])

  // SIMPLIFIED: Remove the complex auth checking since custom events handle it now
  useEffect(() => {
    const checkAuthStatus = () => {
      console.log('🔄 Checking auth status...');
      
      // Debug localStorage contents in detail
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const codeVerifier = localStorage.getItem('code_verifier');
      
      console.log('🗄️ Detailed localStorage:', {
        access_token: accessToken ? `Present (${accessToken.substring(0, 10)}...)` : 'Missing',
        refresh_token: refreshToken ? `Present (${refreshToken.substring(0, 10)}...)` : 'Missing',
        code_verifier: codeVerifier ? 'Present' : 'Missing',
        access_token_full_length: accessToken ? accessToken.length : 0
      });
      
      const newAuthStatus = isAuthenticated();
      console.log('🔍 Auth status result:', newAuthStatus);
      
      if (newAuthStatus !== isSpotifyAuthenticated) {
        console.log('🔄 Auth status changed from', isSpotifyAuthenticated, 'to', newAuthStatus);
        setIsSpotifyAuthenticated(newAuthStatus);
        
        if (newAuthStatus && pendingExport) {
          console.log('🎯 Auth successful and export pending, proceeding with export...');
          proceedWithExport();
          setPendingExport(false);
        }
      } else {
        console.log('🔄 Auth status unchanged:', isSpotifyAuthenticated);
      }
    };
  
    // Check immediately on mount
    console.log('🚀 App mounted, running initial auth check...');
    checkAuthStatus();
    
    // Listen for storage changes (keep this as backup)
    const handleStorageChange = (e) => {
      console.log('💾 Storage change detected:', e.key, e.newValue ? 'Set' : 'Removed');
      if (e.key === 'access_token') {
        console.log('💾 Access token changed in localStorage, rechecking auth...');
        checkAuthStatus();
      }
    };
    
    // Listen for focus events (when user returns to tab)
    const handleFocus = () => {
      console.log('👁️ Window focus gained, rechecking auth...');
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
  
  // Also add this separate effect to debug what happens when auth state changes
  useEffect(() => {
    console.log('🎭 Auth state changed in component:', {
      isSpotifyAuthenticated,
      pendingExport,
      timestamp: new Date().toISOString()
    });
  }, [isSpotifyAuthenticated, pendingExport]);

  // If we're on the callback route, show the callback component
  if (isCallbackRoute) {
    return <SpotifyCallback />
  }
  

  return (
    <div className="pb-30 bg-white">
      <Nav />
      <Header />
      <main> 
        <SearchBar />
        <SearchResults 
          tracks={tracksObject.tracks}
          onTrackSelect={handleTrackSelect}
          playlistActive={playlistActive}
          playlistTracks={playlistTracks}
        />
        <Playlist 
          newTrack={selectedTrack} 
          playlistActive={playlistActive} 
          setPlaylistActive={setPlaylistActive}
          playlistTracks={playlistTracks}
          setPlaylistTracks={setPlaylistTracks}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          onExport={handlePlaylistExport}
          isSpotifyAuthenticated={isSpotifyAuthenticated}
        />
        <ExportMessage message={exportMessage} />
      </main>
    </div>
  )
}

export default App