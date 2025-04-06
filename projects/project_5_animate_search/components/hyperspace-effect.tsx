"use client"

import { useEffect, useRef } from "react"

export default function HyperspaceEffect({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !active) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create stars
    const stars = []
    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 15 + 5,
      })
    }

    // Animation function
    let animationId
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Calculate new position
        star.x += ((star.x - canvas.width / 2) * star.speed) / 100
        star.y += ((star.y - canvas.height / 2) * star.speed) / 100

        // Reset star if it goes off screen
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          star.x = Math.random() * canvas.width * 0.3 + canvas.width * 0.35
          star.y = Math.random() * canvas.height * 0.3 + canvas.height * 0.35
          star.size = Math.random() * 2 + 1
          star.speed = Math.random() * 15 + 5
        }

        // Draw star
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw trail
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = star.size / 2
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - (star.x - canvas.width / 2) * 0.2, star.y - (star.y - canvas.height / 2) * 0.2)
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [active])

  return <canvas ref={canvasRef} className={`hyperspace-effect ${active ? "active" : ""}`} />
}

