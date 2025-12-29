import React, { useRef, useEffect } from "react";
import '../styles/main.css';

export default function VideoFinal() {
  const videoRef = useRef(null);

    useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
        // Entró en fullscreen: reiniciar video + sonido
        video.currentTime = 0;
        video.muted = false;      // sonido ON
        video.play();

        // Pausar audio de fondo
        const backgroundAudio = document.querySelector('audio');
        if (backgroundAudio) {
            backgroundAudio.pause();
        }
        } else {
        // Salió de fullscreen:
        // 1) Volver a silenciar el video
        video.muted = true;

        // 2) Restaurar audio de fondo
        const backgroundAudio = document.querySelector('audio');
        if (backgroundAudio && !backgroundAudio.muted) {
            backgroundAudio.play().catch(() => {});
        }
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
    }, []);


  const getImageSrc = (filename) => {
    if (window.location.pathname.includes('/one-piece/')) {
      return `/one-piece/videos/${filename}`;
    }
    return `/videos/${filename}`;
  };

  return (
    <div className="video-final-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-player"
          controls
          loop
          autoPlay
          muted  
          playsInline
          poster={getImageSrc('video-poster.jpg')}
        >
          <source src={getImageSrc('videofinal.mp4')} type="video/mp4" />
          <source src={getImageSrc('videofinal.webm')} type="video/webm" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    </div>
  );
}
