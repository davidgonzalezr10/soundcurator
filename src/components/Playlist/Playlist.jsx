import React, { useState, useEffect } from 'react'
import Tracklist from '../Tracklist/TracklistSearch'
import PlaylistOn from './PlaylistOn'
import PlaylistOff from './PlaylistOff'

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
        {
            name: 'Necessity',
            artist: 'Rampa',
            album: 'John Digweed Live In Brooklyn New York',
            image: 'https://geo-media.beatport.com/image_size/1400x1400/5e3daf40-a373-4057-9ccf-761a325391dd.jpg',
            id: '3'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '4'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '5'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '6'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '7'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '8'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '9'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '10'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '2'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '2'
        },
        {
            name: 'Levitating - Francis Mercier Remix',
            artist: 'RÜFÜS DU SOL',
            album: 'Inhale / Exhale Remixed',
            image: 'https://i1.sndcdn.com/artworks-2Olc28jdGrL2-0-t500x500.jpg',
            id: '2'
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

const Playlist = ({ newTrack }) => {

    const [playlistActive, setPlaylistActive] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const [playlistTracks, setPlaylistTracks] = useState(mockPlaylist.tracks)

    // Update playlistTracks when newTrack is added
    useEffect(() => {
        if (newTrack) {
            setPlaylistTracks(prevTracks => [...prevTracks, newTrack])
        }
    }, [newTrack])

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
        <section className="mt-10 mx-auto max-w-[86rem] px-6 lg:px-18">
            {playlistActive === false ? (
                <PlaylistOff playlistName={playlistName} changePlaylistName={changePlaylistName} togglePlaylist={togglePlaylist} />
            ) : (
                <PlaylistOn playlistName={playlistName} playlistTracks={playlistTracks} />
            )}
        </section>
    )
}

export default Playlist