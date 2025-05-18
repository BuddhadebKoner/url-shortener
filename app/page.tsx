'use client'

import Hero from '@/components/shared/Hero'
import EnterUrl from '@/components/shared/EnterUrl'
import Services from '@/components/shared/Services'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'

const Page = () => {


  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16 max-w-4xl mx-auto w-full">
        <Hero />
        <EnterUrl
        />
        <Services />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Page