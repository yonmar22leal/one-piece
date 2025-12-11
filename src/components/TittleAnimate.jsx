// TituloAnimado.jsx
import { TypeAnimation } from 'react-type-animation'

function TittleAnimate() {
  return (
    <TypeAnimation
      sequence={[
        "El one piece son los recuerdos que hicimos en el camino",
        1000
      ]}
      speed={50}
      style={{ fontSize: '1.3em', fontWeight: 500, textAlign: 'center', marginBottom: '1.5em' }}
      repeat={0}
    />
  )
}

export default TittleAnimate
