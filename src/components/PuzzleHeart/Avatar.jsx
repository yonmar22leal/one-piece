import React from 'react';

const Avatar = ({ 
  member, 
  showPhotoDesc, 
  setShowPhotoDesc, 
  AVATAR_SIZE, 
  BADGE_SIZE, 
  BADGE_OFFSET, 
  getImageSrc, 
  activated, 
  animating, 
  onPuzzleClick,
  puzzlePieceVisible,
  setPuzzlePieceVisible
}) => {
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setShowPhotoDesc((prev) => !prev);
  };

  const handlePuzzleClick = (e) => {
    e.stopPropagation();
    if (activated || !puzzlePieceVisible || animating) return;
    onPuzzleClick();
  };

  return (
    <div
      className={`avatar-container ${showPhotoDesc ? 'photo-desc-active' : ''}`}
      style={{
        width: '100%',
        maxWidth: '200px',
        height: '200px',
        position: 'relative',
        margin: '0 auto',
        borderRadius: '24px'
      }}
    >
      {/* Avatar principal */}
      {member?.photo ? (
        <>
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
          <button
            onClick={handleAvatarClick}
            style={{
              position: 'absolute',
              inset: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: '24px',
              zIndex: 5,
              padding: 0,
              width: '100%',
              height: '100%'
            }}
            aria-label={`Ver foto de ${member.name}`}
            title="Click para descripción de foto"
          />
        </>
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
            fontWeight: '700',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={handleAvatarClick}
        >
          {member?.name?.charAt(0)?.toUpperCase()}
        </div>
      )}

      {/* ESTRELLA FUGAZ ✨ */}
      {member?.puzzlePiece && puzzlePieceVisible && (
        <button
          onClick={handlePuzzleClick}
          className={`puzzle-badge ${animating ? 'shooting-star' : ''}`}
          style={{
            position: 'absolute',
            right: -BADGE_OFFSET * 0.6,
            bottom: -BADGE_OFFSET * 0.6,
            width: BADGE_SIZE * 0.6,
            height: BADGE_SIZE * 0.6,
            border: 'none',
            background: 'transparent',
            cursor: animating ? 'default' : 'pointer',
            zIndex: 15,
            padding: 0,
            overflow: 'hidden',
            borderRadius: '8px',
            willChange: 'transform, opacity'
          }}
          disabled={animating}
          aria-label={`Completar puzzle de ${member.name}`}
          title="Click para completar puzzle"
        >
          <img
            src={getImageSrc(member.puzzlePiece)}
            alt={`${member.name} puzzle`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </button>
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
            lineHeight: 1.4,
            cursor: 'pointer',
            zIndex: 20
          }}
          onClick={() => setShowPhotoDesc(false)}
        >
          <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>
            📸 {member.name}
          </div>
          <div>{member.photoDesc}</div>
        </div>
      )}

<style jsx>{`
  @keyframes shootingStar {
    0% {
      transform: scale(1) translate(0, 0);
      opacity: 1;
    }
    20% {
      transform: scale(1.3) translate(10px, 15px);  /* ← ABAJO */
      opacity: 0.9;
      filter: drop-shadow(0 0 10px #ffd700);
    }
    60% {
      transform: scale(1.1) translate(40px, 60px);  /* ← MÁS ABAJO */
      opacity: 0.7;
      filter: drop-shadow(0 0 20px #ffed4a);
    }
    100% {
      transform: scale(0.3) translate(120px, 150px); /* ← FUERTE ABAJO */
      opacity: 0;
      filter: drop-shadow(0 0 30px #ffffff);
    }
  }

  .puzzle-badge {
    transition: all 0.2s ease;
  }

  .puzzle-badge:not(.shooting-star):hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .puzzle-badge.shooting-star {
    animation: shootingStar 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards !important;
    pointer-events: none !important;
  }

  .avatar-container button:hover:not([disabled]) {
    background: rgba(255,255,255,0.1);
  }
`}</style>

    </div>
  );
};

export default Avatar;
