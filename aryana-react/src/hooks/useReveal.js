import { useEffect } from 'react'

const revealSel = '.about-card > *, .app-banner, .trust-item, .faq-card, .art, .acc details'

// Scroll-reveal animations
// `page` changes with the route, so the elements of the new page are picked up
export default function useReveal(page) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = []
    const ro = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return
        const el = en.target
        el.classList.add('in')
        ro.unobserve(el)
        // drop the helper classes afterwards so hover transforms still work
        timers.push(setTimeout(() => el.classList.remove('reveal', 'in'), 1400))
      })
    }, { threshold: 0.15 })

    const els = [...document.querySelectorAll(revealSel)]
    els.forEach(el => {
      const sibs = [...el.parentElement.children]
      el.style.setProperty('--d', (sibs.indexOf(el) % 5) * 90 + 'ms')
      el.classList.add('reveal')
      ro.observe(el)
    })

    return () => {
      ro.disconnect()
      timers.forEach(clearTimeout)
      els.forEach(el => el.classList.remove('reveal', 'in'))
    }
  }, [page])
}
