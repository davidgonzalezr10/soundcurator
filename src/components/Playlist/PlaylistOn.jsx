import React from 'react'
import Tracklist from '../Tracklist'

const PlaylistOn = ({ playlistName, playlistTracks }) => {
    console.log('PlaylistOn received playlistName:', playlistName);
    console.log('PlaylistOn received playlistTracks:', playlistTracks);
    console.log('PlaylistOn received playlistTracks length:', playlistTracks ? playlistTracks.length : 0);
    return (
        <div>
            <h2>{playlistName || 'Your playlist'}</h2>
            <Tracklist tracks={playlistTracks} />
            <button>Sync to Spotify</button>
        </div>
    );
};

export default PlaylistOn