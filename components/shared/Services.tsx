import React from 'react'

const Services = () => {
  const features = [
    { title: "Secure", icon: "🔒", desc: "All links use HTTPS encryption" },
    { title: "Analytics", icon: "📊", desc: "Track clicks and visitor data" },
    { title: "Custom URLs", icon: "✨", desc: "Create branded short links" }
  ]

  return (
    <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
      {features.map((feature, i) => (
        <div 
          key={i} 
          className="glass-card p-4 sm:p-6 rounded-lg flex flex-col items-center text-center transition-all duration-300 border border-white/5 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(167,139,255,0.3)] cursor-pointer"
        >
          <div className="text-xl sm:text-2xl mb-2 sm:mb-3 bg-gradient-to-br from-chart-1 to-chart-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg">
            {feature.icon}
          </div>
          <h3 className="font-medium mb-1 sm:mb-2 text-base sm:text-lg">{feature.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{feature.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default Services