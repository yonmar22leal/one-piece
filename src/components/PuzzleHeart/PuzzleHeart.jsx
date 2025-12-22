import React, { useState } from 'react';
import './PuzzleHeart.css';
import PuzzlePiece from './PuzzlePiece';
import HeartComponent from './HeartComponent';

const PuzzleHeart = ({ members = [], activatedPieces, activatePiece }) => {
  const [isHeartComplete, setIsHeartComplete] = useState(false);

  const handlePieceComplete = (memberId) => {
    activatePiece(memberId); // Llama a la prop del padre
    
    // Activa el corazón cuando se completa la primera pieza
    if (!isHeartComplete) {
      setIsHeartComplete(true);
    }
  };

  return (
    <div className="puzzle-heart">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>Miembros</h2>

      {/* 🧩 LISTA DE PIEZAS */}
      <div className="heart-list">
        {members.map((m, idx) => (
          <PuzzlePiece 
            key={m.id} 
            member={m} 
            align={idx % 2 === 0 ? 'left' : 'right'} 
            activated={activatedPieces.has(m.id)} 
            onActivate={() => handlePieceComplete(m.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleHeart;
