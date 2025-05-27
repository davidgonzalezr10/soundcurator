import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
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
    <div className="pt-16 pb-10 lg:pt-20 bg-white">
      <Header />
      <SearchBar />
      <SearchResults tracks={tracks} />
      <Playlist />
    </div>
  )
}

export default App
