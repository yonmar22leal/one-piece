import React from 'react';

const Avatar = ({ member, showPhotoDesc, setShowPhotoDesc, AVATAR_SIZE, BADGE_SIZE, BADGE_OFFSET, getImageSrc }) => {
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setShowPhotoDesc((prev) => !prev);
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
        </div>
      )}
    </div>
  );
};

export default Avatar;