import { useEffect, useState } from 'react';

const Gallery = ({ gallery }) => {
  const [zoomedId, setZoomedId] = useState(null);
  const [flippedId, setFlippedId] = useState(null);

  // Base para dev ("/") y GH Pages ("/one-piece/")
  const base = import.meta.env.BASE_URL || '/';

  const handleImageClick = (id) => {
    if (zoomedId === id) {
      // Si ya está con zoom, alterna el flip
      setFlippedId(flippedId === id ? null : id);
    } else {
      // Nueva foto con zoom, limpia flip
      setZoomedId(id);
      setFlippedId(null);
    }
  };

  const clearZoomAndFlip = () => {
    setZoomedId(null);
    setFlippedId(null);
  };

  useEffect(() => {
    if (!zoomedId) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearZoomAndFlip();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomedId]);

  return (
    <section className="heart-gallery-container" style={{ marginTop: '2rem' }}>
      <div className="heart-gallery">
        {gallery.map((m) => (
          <div
            key={m.id}
            className={`heart-gallery-item ${
              zoomedId === m.id ? 'zoomed' : ''
            } ${flippedId === m.id ? 'flipped' : ''}`}
            onClick={() => handleImageClick(m.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={base + m.photo.replace(/^\/+/, '')}
                  alt={m.note || m.id}
                />
                <div className="heart-gallery-caption">{m.date}</div>
              </div>
              <div className="card-back">
                <div className="note">{m.note}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {zoomedId && (
        <div
          className="overlay"
          onClick={clearZoomAndFlip}
        >
          <div
            className="overlay-inner"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
