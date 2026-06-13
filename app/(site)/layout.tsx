import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import ScrollToTop from '@/components/ui/ScrollToTop'

/**
 * Layout for the public portfolio (home + standalone section pages).
 * Provides the shared chrome: custom cursor, navbar, footer, scroll-to-top.
 * The /admin area lives outside this group, so it gets none of this.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorGlow />
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  )
}
