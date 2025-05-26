import Tracklist from '../components/Tracklist'
import SearchBar from '../components/SearchBar'
import Playlist from '../components/Playlist'

import React from 'react'
import './App.css'


const trackObject = {
  name: 'Safe',
  artist: 'Monkey Safari',
  album: 'Safe',
  image: 'https://f4.bcbits.com/img/a2256888722_10.jpg',
  id: '2364'
}

const tracks = [trackObject, trackObject, trackObject, trackObject, trackObject, trackObject]


function App() {

  return (
    <div>
      <div>
        <h1>SoundCurator</h1>
        <p>Search, curate, sync. The simplest way to create your Spotify playlists.</p>
      </div>
      <SearchBar />
      <Tracklist tracks={tracks} />
      <Playlist />
    </div>
  )
}

export default App
