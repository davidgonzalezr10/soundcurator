import TracklistSearch from './Tracklist/TracklistSearch'
import React, { useState, useEffect } from 'react'

const SearchResults = ({ tracks }) => {

    const [searchResults, setSearchResults] = useState([])

    // Effect to update state when tracks prop changes
    useEffect(() => {
        // Store the tracks array directly into the state
        setSearchResults(tracks)
    }, [tracks])


    return (
        <section className="flex justify-center bg-white border border-gray-400 rounded-lg mx-6 lg:mx-56 lg:mb-16 h-[350px]">
            <TracklistSearch searchResults={searchResults} />
        </section>
    )
}

export default SearchResults