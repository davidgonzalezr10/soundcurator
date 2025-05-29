import React from 'react'
import TrackPlaylist from '../Track/TrackPlaylist'

const TracklistPlaylist = ({ tracks, handleRemoveTrack }) => {
    return (
        <div className="mb-8 lg:bg-gray-100 lg:rounded-lg font-thin text-lg w-full">
            <div className='flex items-center max-lg:hidden mb- py-4 px-2 justify-between border-b border-gray-300'>
                <div className="flex items-center ml-2">
                     <p className="lg:ml-0 lg:mr-2">#</p>
                     <p className="ml-2">Title</p>
                </div>
                <div className="flex items-center">
                     <p className="mr-[5rem]">Album</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto overflow-y-auto h-full max-lg:max-h-[450px] lg:max-h-[650px]">
                <div className="grid grid-cols-1 gap-3 lg:gap-0 w-full place-items-center">
                    {tracks.map(track => {
                        return (
                            <TrackPlaylist 
                                key={track.id} 
                                track={track} 
                                handleRemoveTrack={handleRemoveTrack} 
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default TracklistPlaylist