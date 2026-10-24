import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Goals from './components/Goals.jsx'
import Journey from './components/Journey.jsx'
import AppBanner from './components/AppBanner.jsx'
import Trust from './components/Trust.jsx'
import Features from './components/Features.jsx'
import Faq from './components/Faq.jsx'
import Articles from './components/Articles.jsx'
import Footer from './components/Footer.jsx'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReveal from './hooks/useReveal.js'
import useRoute from './hooks/useRoute.js'
import AboutPage from './components/AboutPage.jsx'

export default function App() {
  const route = useRoute()
  useReveal(route)

  // the pinned sections measure the page once; after the window is resized (or the device mode is changed in the
  // browser tools) re-measure them all, so none of them is left with a stale height and overlaps the next section
  useEffect(() => {
    let t
    const onResize = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 300) }
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); window.removeEventListener('orientationchange', onResize) }
  }, [])

  return (
    <>
      <Header key={route} route={route} />
      {route === 'about' ? <AboutPage /> : (
        <main>
          <Hero />
          <Goals />
          <Journey />
          <Trust />
          <AppBanner />
          <Features />
          <Faq />
          <Articles />
        </main>
      )}
      <Footer />
    </>
  )
}
