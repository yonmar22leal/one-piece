import React, { useState } from 'react'
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
  const [activatedPieces, setActivatedPieces] = useState(new Set());

  const activatePiece = (id) => {
    setActivatedPieces(prev => new Set([...prev, id]));
  };

  const allActivated = activatedPieces.size === members.length;

  return (
    <div className="App">
      <BackgroundAudio />

      <header style={{padding: '2rem 0'}}>
        <h1 style={{fontSize: '2.6rem', margin: 0}}>Mi página — One Piece</h1>
      </header>

      <main>
        <TittleAnimate text="titulo animado" />
        <PuzzleHeart members={members} activatedPieces={activatedPieces} activatePiece={activatePiece} />
        <PuzzleGridHeart members={members} allActivated={allActivated} />
        <Gallery gallery={gallery} />
      </main>

      <div id="dancer">
      </div>
    </div>
  )
}

export default App
