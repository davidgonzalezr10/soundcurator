import React, { useState } from 'react'

const SearchBar = () => {
    const [searchType, setSearchType] = useState('songs')

    return (
        <div>
            <form>
                <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="songs">Songs</option>
                    <option value="artists">Artists</option>
                    <option value="genres">Genres</option>
                </select>
                <input placeholder='Find songs' />
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar