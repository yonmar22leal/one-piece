import React, { useEffect, useState, useRef } from 'react'

function TypingText({ text, speed = 10, start }) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!start) return
    setDisplayed('')
    indexRef.current = 0

    const typeNext = () => {
      setDisplayed(prev => prev + text.charAt(indexRef.current))
      indexRef.current += 1

      if (indexRef.current < text.length) {
        timeoutRef.current = setTimeout(typeNext, speed)
      }
    }

    typeNext()
    return () => clearTimeout(timeoutRef.current)
  }, [text, start, speed])

  return <p>{displayed}</p>
}

export default TypingText
