import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Features from './components/Features.jsx'
import Highlights from './components/Highlights.jsx'
import Journey from './components/Journey.jsx'
import AppBanner from './components/AppBanner.jsx'
import Audience from './components/Audience.jsx'
import Trust from './components/Trust.jsx'
import Faq from './components/Faq.jsx'
import Articles from './components/Articles.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Highlights />
        <Journey />
        <AppBanner />
        <Audience />
        <ContactForm />
        <Trust />
        <Faq />
        <Articles />
      </main>
      <Footer />
    </>
  )
}
