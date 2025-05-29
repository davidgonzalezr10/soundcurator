import React, { useState, useEffect } from 'react'
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
    ],
}

const Playlist = ({ newTrack, playlistActive, setPlaylistActive, playlistTracks, setPlaylistTracks }) => {
    const [playlistName, setPlaylistName] = useState('')

    const handleRemoveTrack = (track) => {
        setPlaylistTracks(prevTracks => {
            const newTracks = prevTracks.filter(currentTrack => 
                !(currentTrack.name === track.name && 
                  currentTrack.artist === track.artist && 
                  currentTrack.album === track.album)
            );
            return newTracks;
        });
    }

    useEffect(() => {
        if (newTrack) {
            setPlaylistTracks(prevTracks => {
                const trackExists = prevTracks.some(track => 
                    track.name === newTrack.name && 
                    track.artist === newTrack.artist && 
                    track.album === newTrack.album
                );

                if (!trackExists) {
                    const trackWithNewId = {
                        ...newTrack,
                        id: (prevTracks.length + 1).toString()
                    }
                    return [...prevTracks, trackWithNewId];
                }
                return prevTracks;
            });
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
                <PlaylistOff 
                    playlistName={playlistName} 
                    changePlaylistName={changePlaylistName} 
                    togglePlaylist={togglePlaylist} 
                />
            ) : (
                <PlaylistOn 
                    playlistName={playlistName} 
                    playlistTracks={playlistTracks} 
                    handleRemoveTrack={handleRemoveTrack}
                    changePlaylistName={changePlaylistName} 
                />
            )}
        </section>
    )
}

export default Playlist