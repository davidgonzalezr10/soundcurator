import React from 'react'
import Track from './Track'

const Tracklist = ({ tracks }) => {
   
    if (!Array.isArray(tracks) || tracks.length === 0) {
        return <p>Time to start curating!</p>;
    }

    return (
        <div>
            {tracks.map(track => (
                <Track key={track.id} track={track} />
            ))}
        </div>
    )
}

export default Tracklist