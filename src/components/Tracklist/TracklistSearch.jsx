import React from 'react'
import TrackSearch from '../Track/TrackSearch'

const TracklistSearch = ({ searchResults }) => {
   
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
        return <p className="mt-4" >No songs were found</p>;
    }

    return (
        <div className="max-w-7xl mx-auto overflow-y-auto">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4 p-5">
                {searchResults.map(track => (
                    <TrackSearch key={track.id} track={track} />
                ))}
            </div>
        </div>
    )
}

export default TracklistSearch