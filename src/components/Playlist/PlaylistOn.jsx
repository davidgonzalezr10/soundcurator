import TracklistPlaylist from '../Tracklist/TracklistPlaylist'
import { MdEdit } from "react-icons/md";
import React, { useState } from 'react'

const PlaylistOn = ({ playlistName, playlistTracks, handleRemoveTrack, changePlaylistName, onExport }) => {
    
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleEditSubmit = () => {
        setIsEditing(false)
    }
    
    return (
        <div>
            <div className="flex justify-center items-center mb-6 lg:mb-8">
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <input 
                            type='text' 
                            value={playlistName || 'Your playlist'}
                            onChange={changePlaylistName}
                            onBlur={handleEditSubmit}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleEditSubmit();
                                }
                            }}
                            maxLength={50}
                            className="text-3xl lg:text-4xl font-DM-sans font-medium text-center bg-transparent border-b outline-none focus:outline-none focus:ring-0"
                        />
                    ) : (
                        <span className="text-3xl lg:text-4xl font-DM-sans font-medium text-center px-2">
                            {playlistName || 'Your playlist'}
                        </span>
                    )}
                    <MdEdit 
                        onClick={handleEdit}
                        className={`w-5 h-5 ${isEditing ? 'hidden' : ''}`}
                    />
                </div>
            </div>
            <TracklistPlaylist tracks={playlistTracks} handleRemoveTrack={handleRemoveTrack} />
            <div className="flex justify-center">
                <button 
                    onClick={onExport}
                    className="text-white font-bold lg:text-lg border bg-spoti-green border-spoti-green rounded-lg hover:cursor-pointer px-4 py-2"
                >
                    Sync to Spotify
                </button>
            </div>
        </div>
    );
};

export default PlaylistOn