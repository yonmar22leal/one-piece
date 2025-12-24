import React, { useEffect, useState, useRef } from 'react'

function TypingText({ text, speed = 50, start }) {
  const [displayed, setDisplayed] = useState('')
  const hasFinished = useRef(false)

  useEffect(() => {
    // Si aún no se debe comenzar o ya terminó, no hacemos nada
    if (!start || hasFinished.current) return

    let i = 0
    setDisplayed('') // limpia por si acaso

    const interval = setInterval(() => {
      setDisplayed(prev => prev + text.charAt(i))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        hasFinished.current = true     // marcamos como completado
      }
    }, speed)

    return () => clearInterval(interval)
  }, [start, text, speed])

  return <p>{displayed}</p>
}

export default TypingText
