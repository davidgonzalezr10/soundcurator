import addTrackIcon from '../../assets/add-track.svg';
import { IoIosAdd } from "react-icons/io"
import React from 'react';

const TrackSearch = ({ track, onTrackSelect, playlistActive, playlistTracks }) => {
    
    const isInPlaylist = playlistTracks.some(playlistTrack => 
        playlistTrack.name === track.name && 
        playlistTrack.artist === track.artist && 
        playlistTrack.album === track.album
    );

    const handleClick = () => {
        if (!isInPlaylist) {
            onTrackSelect(track);
        } else {
            console.log('Track already in playlist:', track.name);
        }
    }

    return (
        <div className="bg-gray-100 text-dark-grey flex justify-between items-center rounded-lg lg:w-95 shadow">
            <div className="flex">
                <img 
                    src={track.image}
                    alt={track.name}
                    className="w-20 h-20 rounded-lg rounded-r-none"
                />
                <div className="w-60 lg:w-63 flex flex-col justify-center pl-2 pr-2 py-2 overflow-hidden">
                    <h3 className="font-bold text-lg truncate">{track.name}</h3>
                    <h4 className="text-sm -mt-0.5 truncate">{track.artist}</h4>
                    <p className="text-xs font-light truncate">{track.album}</p>
                </div>
            </div>
            <button 
                disabled={!playlistActive}
                onClick={handleClick}
                className={`p-4 ${playlistActive ? 'cursor-pointer' : 'cursor-auto'}`}
            >
                <IoIosAdd className={`w-7 h-7 rounded-full ${!isInPlaylist ? 'hover:bg-gray-300' : ''} ${isInPlaylist ? 'bg-spoti-green text-white hover' : ''} ${!playlistActive ? 'opacity-20' : ''}`}/>
            </button>
        </div>
    )
}

export default TrackSearch