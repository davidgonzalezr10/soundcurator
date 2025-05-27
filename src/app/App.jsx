import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Playlist from '../components/Playlist'


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
    <div className="pt-14 pb-10 bg-white">
      <div className="px-6 pb-8 w-full flex-1 justify-center align-middle text-center">
        <h1 className="pb-6 text-4xl font-DM-sans font-extrabold lg:text-7xl text-spoti-green">SoundCurator</h1>
        <p className="text-dark-grey font-bold lg:text-xl lg:mt-4 mb-1">Search, curate, sync.</p>
        <p className="text-sm lg:text-lg text-dark-grey font-light">The simplest way to create your Spotify playlists</p>
      </div>
      <SearchBar />
      <SearchResults tracks={tracks} />
      <Playlist />
    </div>
  )
}

export default App
