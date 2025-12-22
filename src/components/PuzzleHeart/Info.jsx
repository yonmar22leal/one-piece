import React from 'react';

const Info = ({ member, showDesc, typedText, handleDescButtonClick }) => {
  return (
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
            color: '#000000ff',
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
  );
};

export default Info;