import React, { useState } from 'react';
import './PuzzleGridHeart.css';

const PuzzleGridHeart = () => {
  const [pulse, setPulse] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 700);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="heart-3x3-container">
      <h2 style={{
        textAlign: 'center',
        fontWeight: '700',
        fontSize: '2rem',
        marginBottom: '1.5rem'
      }}>
        Nuestro corazón completo
      </h2>

      <div className="heart-image-wrapper">
        <img
          src="/src/assets/images/corazon-completo.png"
          alt="Corazón armado completo"
          className={`heart-full-img ${pulse ? 'clicked' : ''}`}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '90%',
            maxHeight: '80%',
            overflow: 'auto', // para scroll si excede altura
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <button onClick={closeModal} aria-label="Cerrar modal" style={{
              float: 'right',
              fontSize: '1.5rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}>
              ×
            </button>
            <video width="600" controls autoPlay>
              <source src="/src/assets/videos/corazon.mp4" type="video/mp4" />
              
              Tu navegador no soporta video.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default PuzzleGridHeart;
