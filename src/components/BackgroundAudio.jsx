import React, { useRef, useState, useEffect } from 'react'

function BackgroundAudio() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const base = import.meta.env.BASE_URL || '/'

  // Intentar reproducir automáticamente en mute al cargar
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = true

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setMuted(true)
        })
        .catch(err => {
          console.log('Autoplay bloqueado:', err)
        })
    }
  }, [])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying && !muted) {
        // Está sonando con volumen: lo pausamos
        audio.pause()
        setIsPlaying(false)
      } else {
        // Al pulsar activamos audio (sin mute)
        audio.muted = false
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
        }
        setIsPlaying(true)
        setMuted(false)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
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
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        title="Controlar música de fondo"
      >
        {isPlaying && !muted ? '🔇 Silenciar' : '🔊 One Piece'}
      </button>
    </>
  )
}

export default BackgroundAudio
