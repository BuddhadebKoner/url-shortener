import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import EnterCustomeUrl from '@/components/shared/EnterCustomeUrl'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <Navbar />
        {/* main content */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-10 sm:py-16 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Create Custom URL</h1>
          <p className="text-muted-foreground text-center mb-8">Choose your own memorable short URL</p>
          <EnterCustomeUrl />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default page