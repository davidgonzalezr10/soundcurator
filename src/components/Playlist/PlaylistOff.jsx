import React from 'react'

const PlaylistOff = ({ playlistName, changePlaylistName, togglePlaylist }) => (
    <div>
        <h2 className="text-3xl lg:text-4xl font-DM-sans font-medium mb-4 lg:mb-8 text-center">Start curating</h2>
        <div className="flex justify-center shadow rounded-lg lg:mx-52">
            <input
                placeholder='Name your playlist'
                value={playlistName} 
                onChange={changePlaylistName}
                className="bg-gray-100 lg:text-lg rounded-lg rounded-r-none px-4 py-3 w-full"
            />               
            <button onClick={togglePlaylist} disabled={!playlistName} className="px-5 rounded-lg rounded-l-none bg-mid-grey text-white text-3xl font-light">
                +
            </button>
        </div>
    </div>
)

export default PlaylistOff