import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import logo from '../assets/logo/aryana-logo.png'
import useActiveSection from '../hooks/useActiveSection.js'
import { navLinks } from '../data/content.js'

const navHrefs = navLinks.map(l => l.href)

export default function Header() {
  const [open, setOpen] = useState(false)
  // at the very top the header shares the hero's blue; it turns white as soon as the page scrolls
  const [onHero, setOnHero] = useState(true)
  useEffect(() => {
    const onScroll = () => setOnHero(window.scrollY < 12 || document.documentElement.hasAttribute('data-hero-covers'))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('herocover', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('herocover', onScroll)
    }
  }, [])
  const active = useActiveSection(navHrefs, '#top')

  return (
    <header className={onHero ? 'site-header on-hero' : 'site-header'} id="top">
      <div className="container header-inner">
        <div className="brand-wrap">
          <a href="#top" className="brand" aria-label="Aryana"><img src={logo} alt="Aryana" width="120" height="34" /></a>
        </div>

        <button className="nav-toggle" aria-label="منو" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>

        <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="منوی اصلی">
          {navLinks.map(({ href, label }) => (
            <a key={label} href={href} className={href === active ? 'active' : undefined} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#app" className="btn btn-yellow header-cta"><Icon name="download" className="ic" /> دانلود اپلیکیشن</a>
      </div>
    </header>
  )
}
