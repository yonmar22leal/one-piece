import { useState } from 'react';

const Gallery = ({ gallery }) => {
  const [zoomedId, setZoomedId] = useState(null);
  const [flippedId, setFlippedId] = useState(null);

  const handleImageClick = (id) => {
    if (zoomedId === id) {
      // Si ya está zoomed, alterna flip
      setFlippedId(flippedId === id ? null : id);
    } else {
      // Si no está zoomed, set zoom y limpia flip
      setZoomedId(id);
      setFlippedId(null);
    }
  };

  return (
    <section className="heart-gallery-container" style={{ marginTop: '2rem' }}>
      <div className="heart-gallery">
        {gallery.map((m) => (
          <div
            key={m.id}
            className={`heart-gallery-item ${zoomedId === m.id ? 'zoomed' : ''} ${
              flippedId === m.id ? 'flipped' : ''
            }`}
            onClick={() => handleImageClick(m.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={m.photo} alt={m.id} />
                <div className="heart-gallery-caption">{m.date}</div>
              </div>
              <div className="card-back">
                <div className="note">{m.note}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {zoomedId && <div className="overlay" onClick={() => { setZoomedId(null); setFlippedId(null); }} />}
    </section>
  );
};

export default Gallery;
