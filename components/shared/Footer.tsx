import React from 'react'

const Footer = () => {
   return (
      <>
         <footer className="py-4 sm:py-6 border-t border-border/30 backdrop-blur-md bg-background/20">
            <div className="container mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-muted-foreground">
               <p>© {new Date().getFullYear()} abcredirect • Crafted with ❤️</p>
            </div>
         </footer>
      </>
   )
}

export default Footer