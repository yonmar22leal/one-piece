// useRevealOnScroll.js
import { useEffect, useRef, useState } from 'react'

export function useRevealOnScroll(active = true, options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!active || !el) return // <- si no está activo, no hace nada

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [active, options])

  return { ref, visible }
}