import React, { useState, useEffect } from 'react';

const DEFAULT_AVATAR_SIZE = 320;

const PuzzlePiece = ({ member, align = 'left', size }) => {
  const AVATAR_SIZE = typeof size === 'number' && size > 0 ? size : DEFAULT_AVATAR_SIZE;
  const BADGE_SIZE = Math.round(AVATAR_SIZE * 0.55);
  const BADGE_OFFSET = Math.round(AVATAR_SIZE * 0.12);

  const [showDesc, setShowDesc] = useState(false);
  const [typedText, setTypedText] = useState('');

  const handleClick = () => {
    setShowDesc(!showDesc);
    if (showDesc) {
      setTypedText('');
    }
  };

  useEffect(() => {
    if (!showDesc) return;

    let i = 0;
    const text = member?.desc || '';
    const speed = 40; // ms por carácter

    const typeWriter = () => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    const timer = setTimeout(typeWriter, 300); // Delay inicial
    return () => clearTimeout(timer);
  }, [showDesc, member?.desc]);

  // ✅ ESTILOS RESPONSIVE MOBILE-FIRST
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // ✅ Móvil: columna por defecto
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
    gap: '1rem',
    cursor: 'pointer',
    perspective: 1500,
    width: '100%',
    backgroundColor: member?.color || 'transparent',
    borderRadius: '24px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
    padding: '1rem 0.5rem'
  };

  return (
    <div
      className={`puzzle-piece-vertical ${align} main ${showDesc ? 'clicked' : ''}`}
      title={member?.name}
      onClick={handleClick}
      style={containerStyle}
    >
      {/* ✅ AVATAR CONTAINER RESPONSIVE */}
      <div 
        className="avatar-container"
        style={{
          width: '100%',
          maxWidth: '200px', // ✅ Móvil: máximo 200px
          height: '200px',
          position: 'relative',
          margin: '0 auto'
        }}
      >
        {member?.photo ? (
          <img
            src={(() => (import.meta.env.BASE_URL || '/') + member.photo.replace(/^\/+/, ''))()}
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

        {/* Puzzle badge */}
        {member?.puzzlePiece ? (
          <img
            src={(() => (import.meta.env.BASE_URL || '/') + member.puzzlePiece.replace(/^\/+/, ''))()}
            alt={`${member.name} puzzle`}
            style={{
              position: 'absolute',
              right: -BADGE_OFFSET * 0.6, // ✅ Más pequeño en móvil
              bottom: -BADGE_OFFSET * 0.6,
              width: BADGE_SIZE * 0.6,
              height: BADGE_SIZE * 0.6,
              objectFit: 'contain',
              boxShadow: 'none',
              borderRadius: 0,
              background: 'transparent'
            }}
          />
        ) : null}
      </div>

      {/* ✅ INFO CONTAINER CENTRADO */}
      <div 
        className="info-container"
        style={{ 
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1
        }}
      >
        {/* Nombre */}
        <div style={{ 
          fontWeight: 700, 
          fontSize: '1.4rem', 
          marginBottom: '0.5rem', 
          letterSpacing: '0.03em',
          wordBreak: 'break-word'
        }}>
          {member?.name}
        </div>

        {/* Descripción o placeholder */}
        {showDesc ? (
          // ✅ ANIMACIÓN TYPEWRITER
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
            <span style={{ 
              display: 'inline-block', 
              width: '2px', 
              height: '1.2em', 
              background: '#444', 
              animation: 'blink 1s infinite',
              marginLeft: '2px',
              verticalAlign: 'middle'
            }}>|</span>
          </div>
        ) : (
          <div 
            className="placeholder"
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
          >
            Click para ver descripción
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzlePiece;
