import removeTrackIcon from '../../assets/remove-track.svg'
import { IoIosRemoveCircle } from "react-icons/io"
import { IoRemoveCircleOutline } from "react-icons/io5"
import React from 'react';

const TrackPlaylist = ({ track, handleRemoveTrack }) => {
    return (
        <div className="bg-gray-100 lg:bg-transparent text-dark-grey flex items-center w-full h-full lg:h-20 rounded-lg lg:rounded-none shadow lg:shadow-none lg:justify-between lg:hover:bg-gray-200">
                <div className="flex items-center flex-grow">
                    <p className="text-dark-grey max-lg:hidden p-4">{track.id}</p>
                    <img 
                        src={track.image}
                        alt={track.name}
                        className="w-15 rounded-lg rounded-r-none lg:rounded-r-lg h-full object-cover mr-2"
                    />
                    <div className="flex flex-col justify-center overflow-hidden flex-grow pr-2 lg:pr-0">
                        <h3 className="font-bold text-base truncate">{track.name}</h3>
                        <h4 className="text-sm -mt-0.5 truncate">{track.artist}</h4>
                    </div>
                </div>
                <div className="flex items-center hidden lg:flex lg:pr-4">
                    <p className="text-xs font-light truncate lg:mr-2">
                        {track.album}
                    </p>
                    <button 
                        className="px-4" 
                        onClick={() => {
                            handleRemoveTrack(track);
                        }}
                    >
                        <IoRemoveCircleOutline className='w-7 h-7 text-red-600 rounded-full hover:text-white hover:bg-red-600' />
                    </button>
                </div>
                <button 
                    className="p-4 lg:hidden" 
                    onClick={() => {
                        handleRemoveTrack(track);
                    }}
                >
                    <IoIosRemoveCircle className='text-red-700 w-5 h-5' />
                </button>
        </div>
    )
}

export default TrackPlaylist