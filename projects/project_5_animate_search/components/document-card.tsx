"use client"

import { useRef, useEffect, useState } from "react"
import { FileText, Calendar, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DocumentCard({ document, index }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState("")
  const [boxShadow, setBoxShadow] = useState("0 5px 15px rgba(0, 0, 0, 0.3)")

  // Hover effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    setBoxShadow(`
      0 5px 15px rgba(0, 0, 0, 0.3),
      ${(x - centerX) / 10}px ${(y - centerY) / 10}px 15px rgba(124, 58, 237, 0.1)
    `)
  }

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0) rotateY(0)")
    setBoxShadow("0 5px 15px rgba(0, 0, 0, 0.3)")
  }

  // Add a class name that can be targeted by the animation function
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add("card")
    }
  }, [])

  return (
    <Card
      ref={cardRef}
      className={cn(
        "card border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300",
        "hover:border-purple-500/50",
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow,
        ...(transform ? { transform } : {}),
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium text-white">{document.title}</CardTitle>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/50">
            {document.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{document.content}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            <span>{document.type}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{document.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{document.author}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

