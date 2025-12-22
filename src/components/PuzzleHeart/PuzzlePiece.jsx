import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import Info from './Info';
import Gallery from './Gallery';

const DEFAULT_AVATAR_SIZE = 320;

const PuzzlePiece = ({ member, align = 'left', size }) => {
  const AVATAR_SIZE = typeof size === 'number' && size > 0 ? size : DEFAULT_AVATAR_SIZE;
  const BADGE_SIZE = Math.round(AVATAR_SIZE * 0.55);
  const BADGE_OFFSET = Math.round(AVATAR_SIZE * 0.12);

  const [showDesc, setShowDesc] = useState(false);
  const [showPhotoDesc, setShowPhotoDesc] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [typedText, setTypedText] = useState('');

  const handleDescButtonClick = (e) => {
    e.stopPropagation();
    setShowDesc((prev) => !prev);
    if (showDesc) setTypedText('');
  };

  const handleFlipClick = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
    // al voltear limpiamos otros estados
    setShowPhotoDesc(false);
    setShowDesc(false);
    setTypedText('');
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
          color: 'black',
          justifyContent: 'center'
        }}
        title={isFlipped ? 'Volver' : 'Ver fotos'}
      >
        {isFlipped ? '↶' : '↻'}
      </button>

      {/* FRENTE: foto principal + nombre + descripción */}
      {!isFlipped && (
        <>
          <Avatar member={member} showPhotoDesc={showPhotoDesc} setShowPhotoDesc={setShowPhotoDesc} AVATAR_SIZE={AVATAR_SIZE} BADGE_SIZE={BADGE_SIZE} BADGE_OFFSET={BADGE_OFFSET} getImageSrc={getImageSrc} />

          <Info member={member} showDesc={showDesc} typedText={typedText} handleDescButtonClick={handleDescButtonClick} />
        </>
      )}

      {/* REVERSO: SOLO GALERÍA CON member.photos */}
{isFlipped && member?.photos && member.photos.length > 0 && (
  <Gallery member={member} getImageSrc={getImageSrc} />
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
