import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      {/* Custom cursor — client-side only via the component itself */}
      <CursorGlow />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
