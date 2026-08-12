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
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Research />
      <Skills />
      <Leadership />
      <Certifications />
      <Contact />
    </main>
  )
}
