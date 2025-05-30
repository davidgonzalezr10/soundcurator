import React, { useEffect, useState, useRef } from 'react';
import { handleSpotifyCallback } from '../util/SpotifyAuth';

const SpotifyCallback = () => {
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Processing login...');
  
    useEffect(() => {
      let isMounted = true;
  
      const processCallback = async () => {
        console.log('🔄 Starting Spotify callback processing...');
  
        // Check for stale processing flag and clear it if it's old
        const processingTimestamp = sessionStorage.getItem('spotify_processing_timestamp');
        const now = Date.now();
        if (processingTimestamp && (now - parseInt(processingTimestamp)) > 30000) { // 30 seconds timeout
          console.log('🧹 Clearing stale processing flag...');
          sessionStorage.removeItem('spotify_processing');
          sessionStorage.removeItem('spotify_processing_timestamp');
        }
  
        // Check if already being processed by another instance
        if (sessionStorage.getItem('spotify_processing') === 'true') {
          console.log('⏭️ Callback already being processed by another instance, skipping...');
          return;
        }
  
        // Check if already authenticated
        const existingToken = localStorage.getItem('access_token');
        if (existingToken && existingToken !== 'Missing' && existingToken !== null && existingToken !== '') {
          console.log('✅ Already authenticated, redirecting...');
          if (isMounted) {
            setStatus('success');
            setMessage('Already logged in! Redirecting...');
  
            // IMPORTANT: Dispatch event to notify App component
            console.log('🚀 Dispatching auth success event (already authenticated)...');
            window.dispatchEvent(new CustomEvent('spotify-auth-success'));
          }
          setTimeout(() => {
            if (isMounted) {
              console.log('🏠 Redirecting to main app with success parameter...');
              window.location.href = '/?spotify_auth=success';
            }
          }, 1000);
          return;
        }
  
        console.log('🔍 No valid existing token found, proceeding with callback processing...');
  
        // Set processing flag to prevent duplicate processing
        sessionStorage.setItem('spotify_processing', 'true');
        sessionStorage.setItem('spotify_processing_timestamp', now.toString());
  
        try {
          const result = await handleSpotifyCallback();
          console.log('📊 Callback result:', result);
  
          if (!isMounted) {
            // Component unmounted, but still dispatch event if successful
            if (result.success) {
              console.log('🚀 Dispatching auth success event (component unmounted)...');
              window.dispatchEvent(new CustomEvent('spotify-auth-success'));
              
              // Still redirect even if component unmounted with success parameter
              console.log('🏠 Redirecting to main app with success parameter (component unmounted)...');
              setTimeout(() => {
                window.location.href = '/?spotify_auth=success';
              }, 1000);
            }
            return;
          }
  
          if (result.success) {
            console.log('✅ Login successful, preparing to redirect...');
            setStatus('success');
            setMessage('Login successful! Redirecting...');
  
            // CRITICAL: Dispatch the custom event to notify App component
            console.log('🚀 Dispatching auth success event...');
            window.dispatchEvent(new CustomEvent('spotify-auth-success'));
  
            // Clear the authorization code from URL to prevent reuse
            const url = new URL(window.location);
            if (url.searchParams.has('code')) {
              url.searchParams.delete('code');
              window.history.replaceState({}, '', url);
            }
  
            // Clear processing flag after success
            sessionStorage.removeItem('spotify_processing');
            sessionStorage.removeItem('spotify_processing_timestamp');
  
            // Redirect back to main app with success parameter
            setTimeout(() => {
              if (isMounted) {
                console.log('🏠 Redirecting to main app with success parameter...');
                window.location.href = '/?spotify_auth=success';
              }
            }, 2000);
  
          } else {
            console.log('❌ Login failed:', result.error);
            if (isMounted) {
              setStatus('error');
              setMessage(`Login failed: ${result.error}`);
            }
  
            // Clear processing flag after error
            sessionStorage.removeItem('spotify_processing');
            sessionStorage.removeItem('spotify_processing_timestamp');
  
            // Redirect back to main app after error (without success parameter)
            setTimeout(() => {
              if (isMounted) {
                console.log('🏠 Redirecting to main app after error...');
                window.location.href = '/';
              }
            }, 3000);
          }
        } catch (error) {
          console.error('❌ Callback processing error:', error);
          if (isMounted) {
            setStatus('error');
            setMessage('An error occurred during login');
          }
  
          // Clear processing flag after error
          sessionStorage.removeItem('spotify_processing');
          sessionStorage.removeItem('spotify_processing_timestamp');
  
          // Redirect back to main app after error (without success parameter)
          setTimeout(() => {
            if (isMounted) {
              console.log('🏠 Redirecting to main app after error...');
              window.location.href = '/';
            }
          }, 3000);
        }
      };
  
      processCallback();
  
      // Cleanup function
      return () => {
        console.log('🧹 SpotifyCallback component unmounting...');
        isMounted = false;
        // Note: We don't clear the processing flag here because the async operation might still be running
      };
    }, []);
  
    // Backup mechanism - check for tokens every 2 seconds and dispatch event if found
    useEffect(() => {
      let interval;
      
      const checkForTokens = () => {
        const token = localStorage.getItem('access_token');
        if (token && token !== 'Missing' && token !== null && token !== '') {
          console.log('🔍 Backup check found valid token, dispatching event...');
          window.dispatchEvent(new CustomEvent('spotify-auth-success'));
          
          // Also redirect from backup check with success parameter
          console.log('🏠 Backup redirect to main app with success parameter...');
          setTimeout(() => {
            window.location.href = '/?spotify_auth=success';
          }, 1000);
          
          if (interval) {
            clearInterval(interval);
          }
        }
      };
  
      interval = setInterval(checkForTokens, 2000);
  
      // Cleanup
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, []);
  
    const renderStatus = () => {
      switch (status) {
        case 'processing':
          return (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p>{message}</p>
            </div>
          );
        case 'success':
          return (
            <div className="flex flex-col items-center gap-4">
              <div className="text-green-600 text-2xl">✅</div>
              <p className="text-green-600">{message}</p>
            </div>
          );
        case 'error':
          return (
            <div className="flex flex-col items-center gap-4">
              <div className="text-red-600 text-2xl">❌</div>
              <p className="text-red-600">{message}</p>
            </div>
          );
        default:
          return <p>Unknown status</p>;
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Spotify Authorization
          </h1>
          {renderStatus()}
        </div>
      </div>
    );
  };
  
  export default SpotifyCallback;