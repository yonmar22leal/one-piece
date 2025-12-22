const HeartComponent = ({ isComplete }) => {
  return (
    <div className="heart-container">
      <img
        src="/images/corazon-completo.png"
        alt="Corazón completo"
        className="heart-full-img"
        style={{
          height: '500px',
          display: 'block',
          margin: '0 auto',
          borderRadius: '20px',
          objectFit: 'contain',
          ...(isComplete && {
            animation: 'heartBeat 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1)'
          })
        }}
      />
    </div>
  );
};

export default HeartComponent;