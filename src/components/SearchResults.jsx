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
        <div>
            {/* Map over the searchResults state to render Tracks */}
            {searchResults.map(track => (
                <Track key={track.id} track={track} />
            ))}
        </div>
    )
}

export default SearchResults