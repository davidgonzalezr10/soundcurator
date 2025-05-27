import React from 'react';

const Track = ({ track }) => {
    return (
        <div className="bg-gray-100 text-dark-grey flex justify-between items-center rounded-lg lg:w-90 overflow-hidden shadow">
            <div className="flex">
                <img 
                    src={track.image}
                    alt={track.name}
                    className="w-20 h-20 rounded-lg rounded-r-none"
                />
                <div className="w-60 lg:w-40 flex flex-col justify-center pl-2 pr-2 py-2 overflow-hidden">
                    <h3 className="font-bold text-lg truncate">{track.name}</h3>
                    <h4 className="text-sm -mt-0.5 truncate">{track.artist}</h4>
                    <p className="text-xs font-light truncate">{track.album}</p>
                </div>
            </div>
            <button className="bg-spoti-green text-white text-2xl px-4 py-6 rounded-r-lg">+</button>
        </div>
    )
}

export default Track