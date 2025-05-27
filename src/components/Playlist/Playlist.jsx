import React, { useState } from 'react'
import Tracklist  from '../Tracklist'
import PlaylistOn from './PlaylistOn'

const mockPlaylist = {
    name: 'Afro Deep',
    tracks: [ 
        {
            name: 'Say No - Hardt Antoine Remix',
            artist: 'Echonomist',
            album: 'Say No',
            image: 'https://geo-media.beatport.com/image_size/1400x1400/43689ba4-b423-4d3a-b342-3b0dcc024812.jpg',
            id: '1'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '2'
        },
    ],
    id: '12'
}

const Playlist = () => {

    const [playlistActive, setPlaylistActive] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const [playlistTracks, setPlaylistTracks] = useState(mockPlaylist.tracks);


    const togglePlaylist = () => {
        setPlaylistActive(!playlistActive)
        
        if (!playlistActive && !playlistName) {
             setPlaylistName('') 
        }
    }

    const changePlaylistName = ({ target }) => {
        setPlaylistName(target.value)
    }


    return (
        <section>
            {playlistActive === false ? (
                <div>
                    <h2>Start curating</h2>
                    <input
                        placeholder='Name your playlist'
                        value={playlistName} 
                        onChange={changePlaylistName}
                    />               
                    <button onClick={togglePlaylist} disabled={!playlistName}>
                       +
                    </button>
                </div>
            ) : (
                <PlaylistOn playlistName={playlistName} playlistTracks={playlistTracks} />
            )}
        </section>
    )
}

export default Playlist