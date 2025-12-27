// App.jsx
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
import welcomeText from './data/WelcomeText.js'
import farewellText from './data/farewellText.js'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

// función reutilizada para las rutas de imágenes
const getImageSrc = (filename) => {
  if (window.location.pathname.includes('/one-piece/')) {
    return `/one-piece/images/${filename}`
  }
  return `/images/${filename}`
}

function App() {
  const [activatedPieces, setActivatedPieces] = useState(new Set())
  const [startTyping, setStartTyping] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // estado para el modal global del corazón con fotos
  const [showHeartModal, setShowHeartModal] = useState(false)

  const activatePiece = (id) => {
    setActivatedPieces(prev => new Set([...prev, id]))
  }

  const allActivated = activatedPieces.size === members.length

  const handleStart = () => {
    setStartTyping(true)
    setTimeout(() => {
      setShowContent(true)
    }, 4000)
  }

  // abrir/cerrar modal y bloquear scroll del body
  const openHeartModal = () => {
    setShowHeartModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeHeartModal = () => {
    setShowHeartModal(false)
    document.body.style.overflow = ''
  }

  // secciones que se revelan al hacer scroll
  const puzzleSection = useRevealOnScroll(showContent)
  const gridSection = useRevealOnScroll(showContent)
  const gallerySection = useRevealOnScroll(showContent)
  const farewellSection = useRevealOnScroll(showContent)

  return (
    <div className="App">
      <BackgroundAudio />

      <main>
        <TenderBackground />
        <TittleAnimate text="titulo animado" />

        {/* texto de bienvenida */}
        <div className="typing-section">
          <TypingText
            text={welcomeText}
            speed={30}
            start={startTyping}
          />
        </div>

        {/* botón comenzar */}
        {!showContent && (
          <div className="intro-section">
            <button
              className="start-button"
              onClick={handleStart}
            >
              Comenzar
            </button>
          </div>
        )}

        {/* contenido principal */}
        {showContent && (
          <>
            {/* puzzle */}
            <section
              ref={puzzleSection.ref}
              className={`reveal-section ${puzzleSection.visible ? 'is-visible' : ''}`}
            >
              <PuzzleHeart
                members={members}
                activatedPieces={activatedPieces}
                activatePiece={activatePiece}
              />
            </section>

            {/* corazón 3x3 que dispara el modal */}
            <section
              ref={gridSection.ref}
              className={`reveal-section ${gridSection.visible ? 'is-visible' : ''}`}
            >
              <PuzzleGridHeart
                members={members}
                allActivated={allActivated}
                onOpenModal={openHeartModal}
              />
            </section>

            {/* galería */}
            <section
              ref={gallerySection.ref}
              className={`reveal-section ${gallerySection.visible ? 'is-visible' : ''}`}
            >
              <Gallery gallery={gallery} />
            </section>

            {/* texto de despedida */}
            <section
              ref={farewellSection.ref}
              className={`reveal-section ${farewellSection.visible ? 'is-visible' : ''}`}
            >
              <div className="typing2-section">
                <TypingText
                  text={farewellText}
                  start={startTyping}
                />
              </div>
            </section>
          </>
        )}
      </main>

      {showContent && <div id="dancer"></div>}

      {/* MODAL GLOBAL DEL CORAZÓN CON FOTOS */}
      {showHeartModal && (
        <div className="heart-modal" onClick={closeHeartModal}>
          <div
            className="heart-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeHeartModal}
              aria-label="Cerrar modal"
            >
              ×
            </button>

            <img
              src={getImageSrc('corazon-con-fotos.png')}
              alt="Corazón con todas las fotos"
              className="heart-modal-image"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
