"use client"

import { useEffect, useState } from "react"
import { Database } from "lucide-react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const animationTimer = setTimeout(() => setIsAnimating(true), 100)
    const completeTimer = setTimeout(() => onComplete(), 2500)

    return () => {
      clearTimeout(animationTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 flex items-center justify-center z-50 cursor-pointer"
      onClick={onComplete}
    >
      <div className="text-center">
        <div
          className={`mb-8 flex justify-center transition-all duration-1000 ${
            isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-4"
          }`}
        >
          <Image src={"/logo.png"} alt="JSONator Logo" width={64} height={64} className="w-16 h-16" />
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">JSONator</h1>
          <p className="text-xl text-white/90 font-medium drop-shadow-sm">Simple JSON Array Filter Tool</p>
        </div>
      </div>
    </div>
  )
}
