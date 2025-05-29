import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Playlist from '../components/Playlist/Playlist'
import ExportMessage from './ExportMessage'
import { useState, useEffect } from 'react'


const tracksObject = {
  tracks:
    [
      {
        name: 'Safe',
        artist: 'Monkey Safari',
        album: 'Safe',
        image: 'https://f4.bcbits.com/img/a2256888722_10.jpg',
        id: '1',
        uri: 'spotify:track:7v2iUsHqHR1VNLODNUkTOz'
      },
      {
        name: 'Radiance',
        artist: 'Arodes, PÆDE',
        album: 'Radiancce',
        image: 'https://i1.sndcdn.com/artworks-aD8dX4b5r9af-0-t500x500.png',
        id: '2',
        uri: 'spotify:track:26Ei09sNb2GAUlKhSMb6n4'
      },
      {
        name: 'Better With You',
        artist: 'Daniel Allan, Port London',
        album: 'Better With You',
        image: 'https://i1.sndcdn.com/artworks-cVR4SsyIUrMr-0-t500x500.jpg',
        id: '3',
        uri: 'spotify:track:4tCOKaXWHABZ7siVyPIkME'
      },
      {
        name: 'EO',
        artist: 'sunflwr',
        album: 'EO',
        image: 'https://i1.sndcdn.com/artworks-V0Gp7DTEaiyIVXhR-dhuBvg-t500x500.png',
        id: '4',
        uri: 'spotify:track:4tCOKaXWHABZ7siVyPIkME'
      },
    ]
}


function App() {

  const [selectedTrack, setSelectedTrack] = useState(null)
  const [playlistActive, setPlaylistActive] = useState(false)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [trackUris, setTrackUris] = useState([])
  const [exportMessage, setExportMessage] = useState('')

  const handlePlaylistExport = () => {
    const uris = playlistTracks.map(track => track.uri)
    if (playlistTracks.length > 0 ) {
      setTrackUris(uris)
      setPlaylistName('')
      setPlaylistTracks([])
      setPlaylistActive(false)
      setExportMessage('Playlist exported successfully!')
    } else {
      alert('Add at least 1 track to export')
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
      setExportMessage('')
    }, 3000)
  }

  const handleTrackSelect = (track) => {
    setSelectedTrack(track)
  }

  // Reset selectedTrack after it's been added to the playlist
  useEffect(() => {
    if (selectedTrack) {
      const trackExists = playlistTracks.some(track => 
        track.name === selectedTrack.name && 
        track.artist === selectedTrack.artist && 
        track.album === selectedTrack.album
      );
      
      if (trackExists) {
        setSelectedTrack(null);
      }
    }
  }, [playlistTracks, selectedTrack]);

  return (
    <div className="pb-30 bg-white">
      <Nav />
      <Header />
      <main> 
        <SearchBar />
        <SearchResults 
          tracks={tracksObject.tracks}
          onTrackSelect={handleTrackSelect}
          playlistActive={playlistActive}
          playlistTracks={playlistTracks}
        />
        <Playlist 
          newTrack={selectedTrack} 
          playlistActive={playlistActive} 
          setPlaylistActive={setPlaylistActive}
          playlistTracks={playlistTracks}
          setPlaylistTracks={setPlaylistTracks}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          onExport={handlePlaylistExport}
        />
        <ExportMessage message={exportMessage} />
      </main>
    </div>
  )
}

export default App
