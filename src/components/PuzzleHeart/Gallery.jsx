import React from 'react';

const Gallery = ({ member, getImageSrc }) => {
  return (
    <div
      className="gallery-row"
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}
    >
      {member.photos.map((photo, index) => (
        <img
          key={index}
          src={getImageSrc(photo)}
          alt={`${member.name} foto ${index + 1}`}
          style={{
            width: '350px',
            height: '350px',
            objectFit: 'cover',
            borderRadius: '18px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.16)'
          }}
        />
      ))}
    </div>
  );
};

export default Gallery;