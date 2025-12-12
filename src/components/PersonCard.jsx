import React, { useState } from 'react';

const PersonCard = ({ member }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped(!flipped);

  return (
    <div
      style={{
        width: '340px',
        height: '440px',
        perspective: '1500px',
        margin: '1rem',
      }}
    >
      <div
        onClick={toggleFlip}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          textAlign: 'center',
          transition: 'transform 0.9s',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'none',
          cursor: 'pointer',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          margin: 'auto'
        }}
      >
        {/* Frente */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <img
            src={(() => {
              const base = import.meta.env.BASE_URL || '/';
              return member.photo ? base + member.photo.replace(/^\/+/, '') : '';
            })()}
            alt={member.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <h3 style={{marginTop: '10px'}}>{member.name}</h3>
          <p style={{padding: '0 10px', fontSize: '0.9em', color: '#333'}}>
            {member.desc}
          </p>
        </div>

        {/* Reverso con imágenes */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#f5f5f5',
            borderRadius: '20px',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            padding: '1rem',
          }}
        >
          <h3>Imágenes de {member.name}</h3>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {member.images && member.images.length > 0 ? (
              member.images.map((url, idx) => (
                <img
                  key={idx}
                  src={(() => (import.meta.env.BASE_URL || '/') + url.replace(/^\/+/, ''))()}
                  alt={`${member.name} pic ${idx + 1}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    margin: '6px',
                    borderRadius: '12px',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
                  }}
                />
              ))
            ) : (
              <p>No hay imágenes asociadas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
