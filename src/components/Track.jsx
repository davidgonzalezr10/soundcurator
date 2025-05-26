import React from 'react';

const Track = ({ track }) => {
    return (
        <div>
            <img 
                src={track.image}
                alt={track.name}
            />
            <h3>{track.name}</h3>
            <h4>{track.artist}</h4>
            <p>{track.album}</p>
        </div>
    )
}

export default Track