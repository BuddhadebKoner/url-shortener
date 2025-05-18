import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
   return (
      <>
         <nav className="w-full py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-between backdrop-blur-xl bg-background/30 sticky top-0 z-10">
            <div className="w-8 sm:w-12"></div> {/* Spacer for alignment */}
            <h1 className="text-primary text-xl sm:text-2xl font-bold tracking-tight relative group">
               <Link
                  href="/"
                  className="relative z-10 group-hover:text-accent transition-colors duration-300 neon-text">abcredirect
               </Link>
               <span className="absolute inset-0 bg-primary/30 blur-lg rounded-full group-hover:bg-accent/30 transition-colors duration-300"></span>
            </h1>
            <a
               href="https://github.com/BuddhadebKoner/url-shortener"
               target="_blank"
               rel="noopener noreferrer"
               className="p-2 sm:p-2.5 rounded-full hover:bg-secondary/60 transition-all duration-300 border border-primary/30 shadow-[0_0_10px_rgba(167,139,255,0.3)] hover:shadow-[0_0_15px_rgba(167,139,255,0.5)] bg-background/20 backdrop-filter backdrop-blur-sm"
            >
               <Github className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/90 hover:text-primary transition-colors duration-300" />
            </a>
         </nav>
      </>
   )
}

export default Navbar