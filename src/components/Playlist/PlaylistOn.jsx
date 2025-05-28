import React from 'react'
import TracklistPlaylist from '../Tracklist/TracklistPlaylist'

const PlaylistOn = ({ playlistName, playlistTracks }) => {
    
    return (
        <div>
            <h2 className="text-3xl lg:text-4xl font-DM-sans font-medium mb-6 lg:mb-8 text-center">{playlistName || 'Your playlist'}</h2>
            <TracklistPlaylist tracks={playlistTracks} />
            <div className="flex justify-center">
                <button className="text-white font-bold lg:text-lg border bg-spoti-green border-spoti-green rounded-lg hover:cursor-pointer px-4 py-2">Sync to Spotify</button>
            </div>
        </div>
    );
};

export default PlaylistOn