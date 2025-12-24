import React, { useEffect, useState, useRef } from 'react'

function TypingText({ text, speed = 50, start }) {
  const [displayed, setDisplayed] = useState('')
  const hasFinished = useRef(false)

  useEffect(() => {
    if (!start || hasFinished.current) return

    let i = 0
    setDisplayed('') 

    const interval = setInterval(() => {
      setDisplayed(prev => prev + text.charAt(i))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        hasFinished.current = true
      }
    }, speed)

    return () => clearInterval(interval)
  }, [start, text, speed])

  return <p>{displayed}</p>
}

export default TypingText
