import Track from './Track'
import React, { useState, useEffect } from 'react'

const SearchResults = ({ tracks }) => {

    const [searchResults, setSearchResults] = useState([])

    // Effect to update state when tracks prop changes
    useEffect(() => {
        // Store the tracks array directly into the state
        setSearchResults(tracks)
    }, [tracks])


    return (
        <section className="flex justify-center bg-white border border-gray-400 rounded-lg mx-6 lg:mx-18 h-[350px] hidden">
            <div className="max-w-8xl overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-4">
                    {searchResults.map(track => (
                        <Track key={track.id} track={track} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SearchResults