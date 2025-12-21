import React, { useState, useEffect } from 'react';

const DEFAULT_AVATAR_SIZE = 320;

const PuzzlePiece = ({ member, align = 'left', size }) => {
  const AVATAR_SIZE = typeof size === 'number' && size > 0 ? size : DEFAULT_AVATAR_SIZE;
  const BADGE_SIZE = Math.round(AVATAR_SIZE * 0.55);
  const BADGE_OFFSET = Math.round(AVATAR_SIZE * 0.12);

  const [showDesc, setShowDesc] = useState(false);
  const [showPhotoDesc, setShowPhotoDesc] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleDescButtonClick = (e) => {
    e.stopPropagation();
    setShowDesc((prev) => !prev);
    if (showDesc) setTypedText('');
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    // Solo overlay de la foto del frente
    if (isFlipped) return;
    setShowPhotoDesc((prev) => !prev);
  };

  const handleFlipClick = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
    // al voltear limpiamos otros estados
    setShowPhotoDesc(false);
    setShowDesc(false);
    setTypedText('');
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (!member?.photos || member.photos.length === 0) return;
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? member.photos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (!member?.photos || member.photos.length === 0) return;
    setCurrentPhotoIndex((prev) =>
      prev === member.photos.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!showDesc) return;
    let i = 0;
    const text = member?.desc || '';
    const speed = 40;

    const typeWriter = () => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1));
        i += 1;
        setTimeout(typeWriter, speed);
      }
    };

    const timer = setTimeout(typeWriter, 300);
    return () => clearTimeout(timer);
  }, [showDesc, member?.desc]);

  const getImageSrc = (path) =>
    (import.meta.env.BASE_URL || '/') + path.replace(/^\/+/, '');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
    gap: '1rem',
    width: '100%',
    backgroundColor: member?.color || 'transparent',
    borderRadius: '24px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
    padding: '1rem 0.5rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    perspective: 1500
  };

  const flipStyle = isFlipped
    ? { transform: 'rotateY(180deg)', backgroundColor: member?.color || '#f0f0f0' }
    : {};

  return (
    <div
      className={`puzzle-piece-vertical ${align} main`}
      title={member?.name}
      style={{ ...containerStyle, ...flipStyle }}
    >
      {/* BOTÓN VOLTEAR */}
      <button
        onClick={handleFlipClick}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255,255,255,0.9)',
          border: '2px solid rgba(0,0,0,0.1)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title={isFlipped ? 'Volver' : 'Ver fotos'}
      >
        {isFlipped ? '↶' : '↻'}
      </button>

      {/* FRENTE: foto principal + nombre + descripción */}
      {!isFlipped && (
        <>
          <div
            className={`avatar-container ${showPhotoDesc ? 'photo-desc-active' : ''}`}
            style={{
              width: '100%',
              maxWidth: '200px',
              height: '200px',
              position: 'relative',
              margin: '0 auto',
              cursor: 'pointer',
              borderRadius: '24px'
            }}
            onClick={handleAvatarClick}
          >
            {member?.photo ? (
              <img
                src={getImageSrc(member.photo)}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  objectFit: 'cover',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
                  display: 'block'
                }}
              />
            ) : (
              <div
                className="placeholder"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '18px',
                  background: '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  fontWeight: '700'
                }}
              >
                {member?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

            {/* Pieza puzzle */}
            {member?.puzzlePiece && (
              <img
                src={getImageSrc(member.puzzlePiece)}
                alt={`${member.name} puzzle`}
                style={{
                  position: 'absolute',
                  right: -BADGE_OFFSET * 0.6,
                  bottom: -BADGE_OFFSET * 0.6,
                  width: BADGE_SIZE * 0.6,
                  height: BADGE_SIZE * 0.6,
                  objectFit: 'contain'
                }}
              />
            )}

            {/* Overlay descripción foto */}
            {showPhotoDesc && member?.photoDesc && (
              <div
                className="photo-desc-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.9)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  padding: '1rem',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  lineHeight: 1.4
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  📸 {member.name}
                </div>
                <div>{member.photoDesc}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPhotoDesc(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '1.4rem',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div
            className="info-container"
            style={{
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: 1,
              paddingTop: '10px'
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: '1.4rem',
                marginBottom: '0.5rem',
                letterSpacing: '0.03em',
                wordBreak: 'break-word'
              }}
            >
              {member?.name}
            </div>

            {showDesc ? (
              <div
                className="desc-animation"
                style={{
                  fontSize: '1rem',
                  color: '#444',
                  wordBreak: 'break-word',
                  lineHeight: 1.4,
                  minHeight: '2em',
                  maxWidth: '100%'
                }}
              >
                <span>{typedText}</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.2em',
                    background: '#444',
                    animation: 'blink 1s infinite',
                    marginLeft: '2px',
                    verticalAlign: 'middle'
                  }}
                >
                  |
                </span>
              </div>
            ) : (
              <div
                className="desc-placeholder"
                style={{
                  fontSize: '0.95rem',
                  color: '#888',
                  fontStyle: 'italic',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  border: '2px dashed #ddd',
                  cursor: 'pointer',
                  maxWidth: '100%'
                }}
                onClick={handleDescButtonClick}
              >
                Click para ver descripción
              </div>
            )}
          </div>
        </>
      )}

      {/* REVERSO: SOLO GALERÍA CON member.photos */}
{isFlipped && member?.photos && member.photos.length > 0 && (
  <div
    className="gallery-row"
    style={{
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      flexWrap: 'wrap' // por si hay muchas
    }}
  >
    {member.photos.map((photo, index) => (
      <img
        key={index}
        src={getImageSrc(photo)}
        alt={`${member.name} foto ${index + 1}`}
        style={{
          width: '350px',      // puedes subir a 180–200px
          height: '350px',
          objectFit: 'cover',
          borderRadius: '18px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.16)'
        }}
      />
    ))}
  </div>
)}



      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PuzzlePiece;
