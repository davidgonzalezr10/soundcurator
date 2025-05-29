import React, { useState, useEffect } from 'react'
import PlaylistOn from './PlaylistOn'
import PlaylistOff from './PlaylistOff'


const Playlist = ({ newTrack, playlistActive, setPlaylistActive, playlistTracks, setPlaylistTracks, playlistName, setPlaylistName, onExport }) => {

    const handleRemoveTrack = (track) => {
        setPlaylistTracks(prevTracks => {
            // First filter out the removed track
            const filteredTracks = prevTracks.filter(currentTrack => 
                !(currentTrack.name === track.name && 
                  currentTrack.artist === track.artist && 
                  currentTrack.album === track.album)
            );
            
            // Then reassign IDs to all remaining tracks
            const tracksWithNewIds = filteredTracks.map((track, index) => ({
                ...track,
                id: (index + 1).toString()
            }));

            console.log('After removal - Track IDs:', tracksWithNewIds.map(t => ({ name: t.name, id: t.id })));
            return tracksWithNewIds;
        });
    }

    useEffect(() => {
        if (newTrack) {
            console.log('Adding new track:', newTrack.name);
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
                    const newTracks = [...prevTracks, trackWithNewId];
                    console.log('Track added successfully - Current playlist:', newTracks.map(t => ({ name: t.name, id: t.id })));
                    return newTracks;
                }
                console.log('Track already exists in playlist');
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
                    onExport={onExport}
                />
            )}
        </section>
    )
}

export default Playlist