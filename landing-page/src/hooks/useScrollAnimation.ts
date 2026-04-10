'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('[data-animate]')

    elements.forEach((el) => {
      const animationType = el.getAttribute('data-animate')

      if (animationType === 'fade-up') {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
            markers: false,
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
        })
      }

      if (animationType === 'scale-in') {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 0.3,
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
        })
      }

      if (animationType === 'slide-left') {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
          },
          opacity: 0,
          x: -60,
          duration: 0.8,
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return containerRef
}
