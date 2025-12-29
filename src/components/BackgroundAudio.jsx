import React, { useRef, useState, useEffect, useCallback } from 'react';

function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const base = import.meta.env.BASE_URL || '/';

  // Función para pausar/resumir audio de fondo
  const toggleBackgroundAudio = useCallback((shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      if (!isPlaying || muted) {
        audio.muted = false;
        audio.play().then(() => {
          setIsPlaying(true);
          setMuted(false);
        }).catch(console.log);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isPlaying, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.play().then(() => {
      setIsPlaying(true);
      setMuted(true);
    }).catch(console.log);
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying && !muted) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
        setMuted(false);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Detectar cuando entra/sale fullscreen para pausar/resumir
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // Pausar audio de fondo en fullscreen
        toggleBackgroundAudio(false);
      } else {
        // Resumir audio de fondo al salir de fullscreen
        toggleBackgroundAudio(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [toggleBackgroundAudio]);

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
  );
}

export default BackgroundAudio;
