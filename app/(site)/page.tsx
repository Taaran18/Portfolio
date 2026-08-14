import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Leadership from '@/components/sections/Leadership'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Skills from '@/components/sections/Skills'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import Faq from '@/components/sections/Faq'
import JsonLd from '@/components/JsonLd'
import { homeGraph } from '@/lib/seo'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <JsonLd schema={homeGraph()} />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Research />
      <Skills />
      <Leadership />
      <Certifications />
      <Contact />
      <Faq />
    </main>
  )
}
