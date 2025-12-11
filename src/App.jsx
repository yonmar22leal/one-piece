import React from 'react'
import './styles/main.css'
import PuzzleHeart from './components/PuzzleHeart/PuzzleHeart'
import members from './data/members.json'
import PuzzleGridHeart from './components/PuzzleGridHeart.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import gallery from './data/gallery.json'
import './components/Gallery/Gallery.css'
import TittleAnimate from './components/TittleAnimate.jsx'
import BackgroundAudio from './components/BackgroundAudio.jsx'


function App() {
  return (
    <div className="App">
      <BackgroundAudio />

      <header style={{padding: '2rem 0'}}>
        <h1 style={{fontSize: '2.6rem', margin: 0}}>Mi página — One Piece</h1>
      </header>

      <main style={{padding: '2rem 1rem'}}>
        <TittleAnimate text="titulo animado" />
        <PuzzleHeart members={members} />
        <PuzzleGridHeart members={members} />
        <Gallery gallery={gallery} />
      </main>

      <div id="dancer">
      </div>
    </div>
  )
}

export default App
