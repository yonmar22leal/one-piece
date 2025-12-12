import React, { useRef, useState, useEffect } from 'react'

function BackgroundAudio() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.log('Autoplay bloqueado:', error)
          })
        } else {
          setIsPlaying(true)
        }
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  // Detectar cambios de estado del audio automáticamente
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const base = import.meta.env.BASE_URL || '/';

  return (
    <>
      <audio
        ref={audioRef}
        loop
        volume="0.2"
        preload="metadata"
      >
        <source src={`${base}audio/one-piece-theme2.mp3`} type="audio/mpeg" />
        <source src={`${base}audio/one-piece-theme2.ogg`} type="audio/ogg" />
        Tu navegador no soporta audio.
      </audio>

      <button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          top: 20,
          right: 60,
          zIndex: 1000,
          padding: '12px 18px',
          borderRadius: '50px',
          border: 'none',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        title="Controlar música de fondo"
      >
        {isPlaying ? '🔇 Silenciar' : '🔊 One Piece'}
      </button>
    </>
  )
}

export default BackgroundAudio
