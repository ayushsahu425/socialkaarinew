import { About } from './components/About'
import { ClientMarquee } from './components/ClientMarquee'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Results } from './components/Results'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Work } from './components/Work'
import { EnquiryProvider } from './context/EnquiryContext'

export default function App() {
  return (
    <EnquiryProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <ClientMarquee />
        <About />
        <Services />
        <Work />
        <Results />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </EnquiryProvider>
  )
}
