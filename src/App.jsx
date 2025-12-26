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
import QRDescargable from './utils/QRDescargable.jsx'

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
            text="Enn un mundo donde las conexiones se desvanecen, hay algo verdaderamente especial en la vida, como un tesoro que no todos los logran encontrar, esos lazos en que trascienden el tiempo y la distancia, LA AMISTAD.  Y puedo decir, la conseguimos, nuestra historia de amistad se ha convertido en familia, LA FAMILIA ONE PIECE. Cada risa compartida, cada historia, lágrimas, abrazos y cada aventura vivida juntos ha formado esto.... Creo fielmente en el BELLO CLICK (sino han visto la peli jajajaaj se fregaron) Pero está vez, creo y escribo en los bellos click de nosotros que nos han traído hasta aqui....
Y me recuerda lo afortunada que soy por tenerlos en esta aventura y locura llamada VIDA 💜💙🩷💚♥️🖤 Proverbios 17:17."
            speed={30}
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
            <QRDescargable/>
          </>
        )}
      </main>

      {showContent && <div id="dancer"></div>}
    </div>
  )
}

export default App
