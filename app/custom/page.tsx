import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">

        <Navbar />
        {/* main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16 max-w-4xl mx-auto w-full">

        </main>
        <Footer />
      </div>
    </>
  )
}

export default page