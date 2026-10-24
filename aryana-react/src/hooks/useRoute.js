import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The site is one page plus an "About us" page. There is no router library: the page is chosen by the hash,
// "#/about" shows the About page and anything else (#faq, #app, #top, nothing) shows the home page.
const read = () => (window.location.hash.startsWith('#/about') ? 'about' : 'home')

export default function useRoute() {
  const [route, setRoute] = useState(read)
  const previous = useRef(route)
  const didFirst = useRef(false)

  useEffect(() => {
    // the home page is built (and its pinned hero measured) from the top, so a page change always starts there
    const onHash = () => {
      const next = read()
      if (next !== previous.current) window.scrollTo({ top: 0, behavior: 'instant' })
      setRoute(next)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // A page change starts at the top; coming back to the home page with an anchor (#faq…) scrolls to that section
  // once the pinned sections have measured themselves. The same goes for opening the site on an anchor (…/#faq): the
  // browser cannot find the place before the pinned sections have their final height.
  useLayoutEffect(() => {
    const changed = previous.current !== route
    previous.current = route
    if (!changed && (didFirst.current || route === 'about')) return
    if (route === 'about') { didFirst.current = true; window.scrollTo({ top: 0, behavior: 'instant' }); return }
    const id = decodeURIComponent(window.location.hash.slice(1))
    const t = setTimeout(() => {
      didFirst.current = true
      ScrollTrigger.refresh()
      const el = id && document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'instant' })
      else if (changed) window.scrollTo({ top: 0, behavior: 'instant' })
    }, 120)
    return () => clearTimeout(t)
  }, [route])

  return route
}
