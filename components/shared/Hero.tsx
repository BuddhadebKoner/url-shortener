import React from 'react'
import { Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 relative">
      <div className="flex justify-center items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3 animate-pulse" />
        <span className="text-chart-3 text-sm sm:text-base font-medium">Fast & Secure</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-chart-3 to-sidebar-primary bg-clip-text text-transparent drop-shadow-sm neon-text">
        Secure URL Shortener
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mt-3 sm:mt-4 px-2">
        Create short, memorable links in seconds with our{" "}
        <span className='line-through text-primary'>
          premium
        </span>
        {" "}Free
        URL shortening service
      </p>

      {/* Visual embellishment */}
      <div className="absolute -z-10 w-full h-full top-0 left-0 bg-gradient-to-b from-primary/5 to-transparent blur-3xl opacity-60"></div>
    </div>
  )
}

export default Hero