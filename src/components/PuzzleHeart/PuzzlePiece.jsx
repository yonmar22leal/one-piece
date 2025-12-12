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
      setTypedText(''); // Reset al cerrar
    }
  };

  // ✅ ANIMACIÓN TYPEWRITER
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

  const containerStyle = {
    display: 'flex',
    flexDirection: align === 'left' ? 'row' : 'row-reverse',
    alignItems: 'center',
    margin: '1.6em 0',
    gap: '2em',
    cursor: 'pointer',
    perspective: 1500,
  };

  return (
    <div
      className={`puzzle-piece-vertical ${align} main ${showDesc ? 'clicked' : ''}`}
      title={member?.name}
      onClick={handleClick}
      style={containerStyle}
    >
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: align === 'left' ? 'row' : 'row-reverse',
              alignItems: 'center',
              gap: '2em',
              position: 'relative',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, flex: `0 0 ${AVATAR_SIZE}px`, position: 'relative' }}>
              {member?.photo ? (
                <img
                  src={(() => (import.meta.env.BASE_URL || '/') + member.photo.replace(/^\/+/, ''))()}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 24,
                    objectFit: 'cover',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
                  }}
                />
              ) : (
                <div
                  className="placeholder"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 18,
                    background: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: Math.round(AVATAR_SIZE / 4),
                  }}
                >
                  {member?.name?.charAt(0)}
                </div>
              )}

              {member?.puzzlePiece ? (
                <img
                  src={(() => (import.meta.env.BASE_URL || '/') + member.puzzlePiece.replace(/^\/+/, ''))()}
                  alt={`${member.name} puzzle`}
                  style={{
                    position: 'absolute',
                    right: -BADGE_OFFSET,
                    bottom: -BADGE_OFFSET,
                    width: BADGE_SIZE,
                    height: BADGE_SIZE,
                    objectFit: 'contain',
                    boxShadow: 'none',
                    borderRadius: 0,
                    background: 'transparent',
                  }}
                />
              ) : null}
            </div>

            <div style={{ 
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',   // ✅ centra horizontal
                  textAlign: 'center'     // ✅ texto centrado
                }}>
              <div style={{ fontWeight: 700, fontSize: '1.6em', marginBottom: 6, letterSpacing: '0.03em' }}>
                {member?.name}
              </div>
              {showDesc ? (
                // ✅ ANIMACIÓN TYPEWRITER 🎉
                <div 
                  className="desc-animation"
                  style={{ 
                    fontSize: '1.11em', 
                    color: '#444', 
                    wordBreak: 'break-word', 
                    marginRight: '2.45em', 
                    marginTop: '0.45em', 
                    lineHeight: 1.35,
                    minHeight: '2.5em' // Espacio fijo para animación
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
                    fontSize: '1.11em', 
                    color: '#888', 
                    fontStyle: 'italic',
                    padding: '0.8em 1.2em',
                    background: 'linear-gradient(135deg, #f0f2f4 0%, #f8ceea 100%)',
                    borderRadius: 12,
                    border: '2px dashed #ddd',
                    cursor: 'pointer'
                  }}
                >
                  Click para ver descripción
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePiece;
