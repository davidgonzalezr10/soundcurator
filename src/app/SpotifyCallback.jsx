import { useEffect, useState } from 'react';
import { handleSpotifyCallback } from '../util/spotifyAuth';

const SpotifyCallback = () => {
    const [status, setStatus] = useState('Processing login...');

    useEffect(() => {
        const processCallback = async () => {
            try {
                const result = await handleSpotifyCallback();
                
                if (result.success) {
                    setStatus('Login successful! Redirecting...');
                    // Small delay to show success message, then redirect
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else {
                    setStatus(`Login failed: ${result.error}`);
                    // Redirect back to main page after showing error
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }
            } catch (error) {
                console.error('Callback processing error:', error);
                setStatus('An error occurred during login');
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            }
        };

        processCallback();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <div className="mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                </div>
                <p className="text-lg text-gray-700">{status}</p>
            </div>
        </div>
    );
};

export default SpotifyCallback;