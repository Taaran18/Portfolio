import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Leadership from '@/components/sections/Leadership'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Skills from '@/components/sections/Skills'
import Certifications from '@/components/sections/Certifications'
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
        <Leadership />
        <Projects />
        <Research />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  )
}
