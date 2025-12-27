import React from 'react'
import './PuzzleGridHeart.css'

const getImageSrc = (filename) => {
  if (window.location.pathname.includes('/one-piece/')) {
    return `/one-piece/images/${filename}`
  }
  return `/images/${filename}`
}

const PuzzleGridHeart = ({ allActivated, onOpenModal }) => {
  const handleClick = () => {
    if (!allActivated) return
    if (onOpenModal) onOpenModal()
  }

  return (
    <section className="heart-3x3-container">
      <div className="heart-image-wrapper">
        <img
          src={
            allActivated
              ? getImageSrc('corazon-completo.png')
              : getImageSrc('corazon-incompleto.png')
          }
          alt={allActivated ? 'Corazón armado completo' : 'Corazón incompleto'}
          className={`heart-full-img ${allActivated ? 'complete' : 'incomplete'}`}
          onClick={handleClick}
          style={{ cursor: allActivated ? 'pointer' : 'default' }}
        />
      </div>
    </section>
  )
}

export default PuzzleGridHeart
