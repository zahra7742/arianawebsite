import { useEffect, useState } from 'react'

// Highlight active nav link on scroll: returns the hash of the section in view
export default function useActiveSection(hrefs, initial) {
  const [active, setActive] = useState(initial)

  useEffect(() => {
    const sections = [...new Set(hrefs)].filter(h => !h.startsWith('#/')).map(h => document.querySelector(h)).filter(Boolean)
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) setActive('#' + en.target.id)
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [hrefs])

  return active
}
