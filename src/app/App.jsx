import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Playlist from '../components/Playlist/Playlist'


const trackObject = {
  name: 'Born To Be Wild aaaaaaaaaaaaa',
  artist: 'Monkey Safari aaaaaaaaaaaa',
  album: 'Safe aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  image: 'https://f4.bcbits.com/img/a2256888722_10.jpg',
  id: '2364'
}

const tracks = [trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject, trackObject]


function App() {

  return (
    <div className="pb-10 bg-white">
      <Nav />
      <Header />
      <main> 
        <SearchBar />
        <SearchResults tracks={tracks} />
        <Playlist />
      </main>
    </div>
  )
}

export default App
