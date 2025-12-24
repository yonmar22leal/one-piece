import { TypeAnimation } from 'react-type-animation';

function TittleAnimate() {
  const getImageSrc = (filename) => {
    if (window.location.pathname.includes('/one-piece/')) {
      return `/one-piece/images/${filename}`;
    }
    return `/images/${filename}`;
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '1.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <header style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2.6rem', margin: 0 }}>One Piece</h1>
      </header>

      <TypeAnimation
        sequence={[
          'El one piece son los recuerdos que hicimos en el camino',
          1000,
        ]}
        speed={50}
        style={{
          fontSize: '1.3em',
          fontWeight: 500,
          textAlign: 'center',
          marginBottom: '1em',
        }}
        repeat={0}
      />

      {/* Imagen portada compatible dev + GH Pages */}
      <img
        src={getImageSrc('portada3.png')}
        alt="Portada del PDF de recuerdos"
        style={{
          maxWidth: '100%',
          height: '100vh',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          marginTop: '0.5em',
        }}
      />
    </div>
  );
}

export default TittleAnimate;
