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
import TenderBackground from './components/TenderBackground.jsx'
import TypingText from './components/TypingText.jsx'

function App() {
  const [activatedPieces, setActivatedPieces] = useState(new Set())
  const [startTyping, setStartTyping] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const activatePiece = (id) => {
    setActivatedPieces(prev => new Set([...prev, id]))
  }

  const allActivated = activatedPieces.size === members.length

  const handleStart = () => {
    // 1) comienza a escribir el texto
    setStartTyping(true)

    // 2) mostramos el contenido después de un tiempo (por ej. 4s)
    //    o si prefieres, puedes controlar esto con un callback desde TypingText
    setTimeout(() => {
      setShowContent(true)
    }, 4000)
  }

  return (
    <div className="App">
      <BackgroundAudio />

      <main>
        <TenderBackground />

        <TittleAnimate text="titulo animado" />

        {/* Texto: solo se escribe cuando startTyping = true, pero luego NO se quita */}
        <div className="typing-section">
          <TypingText
            text="Caada pieza de este corazón guarda un momento, una risa y una historia que compartimos. Hoy volvemos a unirlas, una a una, para recordar que aunque el tiempo pase y los caminos cambien, lo que vivimos juntos sigue armado en nuestro corazón."
            speed={40}
            start={startTyping}
          />
        </div>

        {/* Botón de comenzar: dispara el typing y luego la aparición del contenido */}
        <div className="intro-section">
          {!showContent && (
            <button
              className="start-button"
              onClick={handleStart}
            >
              Comenzar
            </button>
          )}
        </div>

        {/* Contenido principal que aparece luego */}
        {showContent && (
          <>
            <PuzzleHeart
              members={members}
              activatedPieces={activatedPieces}
              activatePiece={activatePiece}
            />

            <PuzzleGridHeart
              members={members}
              allActivated={allActivated}
            />

            <Gallery gallery={gallery} />
          </>
        )}
      </main>

      {showContent && <div id="dancer"></div>}
    </div>
  )
}

export default App
