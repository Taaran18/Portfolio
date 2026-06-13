import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Leadership from '@/components/sections/Leadership'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Skills from '@/components/sections/Skills'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'

/**
 * Home — the full single-scroll experience with every section.
 * Each section also has its own standalone page (e.g. /about, /projects).
 */
export default function Home() {
  return (
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
  )
}
