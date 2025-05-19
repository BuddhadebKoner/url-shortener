import React, { useEffect, useState } from 'react'
import { Sparkles,Loader2 } from 'lucide-react'
import { getStats } from '@/lib/api'

const Hero = () => {
  const [stats, setStats] = useState<{ urlCount: number; clickCount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFetchStats = async () => {
    try {
      setLoading(true);
      const res = await getStats();
      setStats(res);
      console.log("Stats:", res);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetchStats();
  }, [])

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

      {/* Stats */}
      <div className="flex justify-center items-center gap-8 sm:gap-12 mt-8 max-w-md mx-auto">
        <div className="flex flex-col items-center p-4 rounded-lg">
          {loading ? (
            <Loader2 className="h-6 w-6 text-primary animate-spin mb-1" />
          ) : (
            <>
              {/* <Link2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1" /> */}
              <span className="text-1xl sm:text-xl font-bold text-foreground">{stats?.urlCount || 0}+</span>
            </>
          )}
          <span className="text-xs sm:text-sm text-muted-foreground mt-1">URLs Created</span>
        </div>

        <div className="flex flex-col items-center p-4 rounded-lg">
          {loading ? (
            <Loader2 className="h-6 w-6 text-chart-3 animate-spin mb-1" />
          ) : (
            <>
              {/* <MousePointerClick className="h-5 w-5 sm:h-6 sm:w-6 text-chart-3 mb-1" /> */}
              <span className="text-1xl sm:text-xl font-bold text-foreground">{stats?.clickCount || 0}+</span>
            </>
          )}
          <span className="text-xs sm:text-sm text-muted-foreground mt-1">Total Clicks</span>
        </div>
      </div>

      {/* Visual embellishment */}
      <div className="absolute -z-10 w-full h-full top-0 left-0 bg-gradient-to-b from-primary/5 to-transparent blur-3xl opacity-60"></div>
    </div>
  )
}

export default Hero