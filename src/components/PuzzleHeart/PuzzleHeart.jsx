import React from 'react';
import './PuzzleHeart.css';
import PuzzlePiece from './PuzzlePiece';



const PuzzleHeart = ({ members = [] }) => {
   return (
     <div className="puzzle-heart">
       <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>Miembros</h2>
      <div className="heart-list">
         {members.map((m, idx) => (
         <PuzzlePiece key={m.id} member={m} align={idx % 2 === 0 ? 'left' : 'right'} />
          ))}
       </div>
     </div>
   );
};


export default PuzzleHeart;