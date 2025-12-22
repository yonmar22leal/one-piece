import React, { useState } from 'react';
import './PuzzleGridHeart.css';

const PuzzleGridHeart = ({ allActivated }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getImageSrc = (filename) => {
    if (window.location.pathname.includes('/one-piece/')) {
      return `/one-piece/images/${filename}`;
    }
    return `/images/${filename}`;
  };

  const handleClick = () => {
    if (!allActivated) return;      // ✅ Solo si está completo
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="heart-3x3-container">
      <h2
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        Nuestro corazón completo
      </h2>

      <div className="heart-image-wrapper">
        <img
          src={
            allActivated
              ? getImageSrc('corazon-completo.png')
              : getImageSrc('corazon-incompleto.png')
          }
          alt="Corazón armado completo"
          className={`heart-full-img ${allActivated ? 'complete' : ''}`}
          onClick={handleClick}
          style={{ cursor: allActivated ? 'pointer' : 'default' }} // ✅ Solo parece clicable cuando está completo
        />
      </div>

      {modalOpen && (
        <div className="heart-modal" onClick={closeModal}>
          <div
            className="heart-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
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
    </section>
  );
};

export default PuzzleGridHeart;
