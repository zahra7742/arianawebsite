import { useEffect, useRef } from 'react'
import useMediaQuery from '../hooks/useMediaQuery.js'
import Icon from './Icon.jsx'
import cardFront from '../assets/photos/card-front.png'
import app from '../assets/photos/app.jpg'

// Four light cards in two rows (on phones the cards with a photo and without one alternate: a, b, d, c), each with an icon tile, a title and a short text; the two wide ones have a photo that fades into the card.
// SAMPLE TEXT + PHOTOS: replace with your own.
const CARDS = [
  { id: 'a', icon: 'bolt', title: 'انتقال سریع', text: 'پول را در چند ثانیه و به همان لحظه به کارت یا حساب دیگر بفرستید.' },
  { id: 'b', icon: 'phone', title: 'مدیریت از اپلیکیشن', text: 'موجودی، تراکنش‌ها و گزارش خرج‌هایتان را هر لحظه و هرجا از روی گوشی ببینید.', img: app },
  { id: 'd', icon: 'shield', title: 'امنیت و اطمینان', text: 'هر تراکنش با لایه‌های امنیتی بانکی محافظت می‌شود.' },
  { id: 'c', icon: 'card', title: 'پرداخت و خرید آسان', text: 'با یک کارت بانکی ویژه شما، هم در فروشگاه و هم آنلاین پرداخت کنید.', img: cardFront },
]

export default function Features() {
  // PHONES ONLY. The cards take no room until they open, and they open one at a time with the section growing like a roller blind:
  //  - arriving from above (scrolling down): first card to last, the section grows downwards;
  //  - arriving from below (scrolling up): last card to first, the section grows upwards and what is below it stays
  //    exactly where it is on the screen.
  // Once a card is out of view again it closes, ready to open the next time.
  // On desktop none of this runs: the four cards are simply there (the stylesheet shows them open).
  const ref = useRef(null)
  const phone = useMediaQuery('(max-width: 640px)')
  useEffect(() => {
    if (!phone) return
    const section = ref.current
    const slots = [...section.querySelectorAll('.rsn-slot')]
    const order = slots.map(s => s.dataset.id)
    const html = document.documentElement
    html.style.overflowAnchor = 'none' // the page position is kept by hand below, so the browser must not do it too

    const on = new Set()
    let queue = []
    let timer = null
    let mode = 'down' // 'down' = arrived from above, 'rise' = arrived from below
    let rising = false // true while a rising sequence is opening cards
    let risingTimer = null
    let skipResize = false
    let lastH = section.getBoundingClientRect().height
    let carry = 0 // the fractions of a pixel that scrolling by whole pixels could not follow

    const step = () => {
      // if the person has scrolled away from the section in the meantime, the rest waits for the next visit
      const box = section.getBoundingClientRect()
      if (box.bottom < -40 || box.top > window.innerHeight + 40) queue = []
      const el = queue.shift()
      if (!el) {
        timer = null
        clearTimeout(risingTimer)
        risingTimer = setTimeout(() => { rising = false }, 700) // the last card is still growing for a moment
        return
      }
      on.add(el.dataset.id)
      el.classList.toggle('rise', mode === 'rise') // a rising card is pulled up from its bottom edge
      el.classList.add('open')
      // the next card starts while this one is still settling, so the cards flow into each other; quicker on phones,
      // where people scroll fast
      timer = setTimeout(step, window.innerWidth <= 640 ? 260 : 380)
    }

    // while cards rise, whatever grows in the section must not push what is below it down the screen:
    // scroll by exactly the growth, before the frame is painted
    const ro = new ResizeObserver(() => {
      const h = section.getBoundingClientRect().height
      const delta = h - lastH
      lastH = h
      if (skipResize) { skipResize = false; return }
      if (rising && delta) {
        carry += delta
        const whole = Math.round(carry)
        carry -= whole
        if (whole) window.scrollBy({ top: whole, behavior: 'instant' })
      }
    })
    ro.observe(section)

    // closing the cards of a section that is above the screen must not move what the person is looking at: close
    // them at once and scroll by exactly the height the section lost
    const closeAboveAll = els => {
      const before = section.getBoundingClientRect().height
      els.forEach(el => { el.style.transition = 'none'; el.classList.remove('open') })
      const after = section.getBoundingClientRect().height // reading it here applies the change right now
      skipResize = true
      lastH = after
      if (after !== before) window.scrollBy({ top: after - before, behavior: 'instant' })
      requestAnimationFrame(() => els.forEach(el => { el.style.transition = '' }))
    }

    // 1. opening: a closed card has no height, so it counts as "arrived" when its spot is inside a band of the
    //    screen (between 8% and 92% of its height); which edge of the band it crossed tells the direction.
    //    From then on the cards open one after the other by themselves
    const opener = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return
        const el = en.target
        if (timer || queue.length || on.has(el.dataset.id)) return // a sequence is already running
        mode = en.boundingClientRect.top < window.innerHeight / 2 ? 'rise' : 'down'
        rising = mode === 'rise'
        queue = slots.filter(s => !on.has(s.dataset.id)) // the whole sequence: every card that is still closed
      })
      queue.sort((x, y) => (mode === 'rise' ? -1 : 1) * (order.indexOf(x.dataset.id) - order.indexOf(y.dataset.id)))
      if (!timer && queue.length) step()
    }, { threshold: 0, rootMargin: '-8% 0px -8% 0px' })

    // 2. closing: when the whole section is out of the screen, every open card closes, ready for the next visit.
    //    (checked on scroll, because a card can open below the screen and never be seen leaving it)
    let frame = 0
    const sweep = () => {
      frame = 0
      const box = section.getBoundingClientRect()
      const above = box.bottom < -60
      const below = box.top > window.innerHeight + 60
      if (!above && !below) return
      queue = []
      const open = slots.filter(el => on.has(el.dataset.id))
      open.forEach(el => on.delete(el.dataset.id))
      if (above) closeAboveAll(open)
      else open.forEach(el => el.classList.remove('open'))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sweep) }
    window.addEventListener('scroll', onScroll, { passive: true })

    slots.forEach(el => opener.observe(el))
    return () => {
      opener.disconnect(); ro.disconnect()
      window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame)
      clearTimeout(timer); clearTimeout(risingTimer)
      html.style.overflowAnchor = ''
      slots.forEach(el => { el.classList.remove('open', 'rise'); el.style.transition = '' })
    }
  }, [phone])

  return (
    <section ref={ref} className="rsn container" aria-label="ویژگی‌های آریانا کارت">
      <div className="rsn-band">
        <div className="rsn-grid">
          {CARDS.map(({ id, icon, title, text, img }) => (
            <div key={id} data-id={id} className={`rsn-slot ${id}`}>
              <div className="rsn-wrap">
                <article className={`rsn-card ${id}`}>
                  {img && <img className="rsn-photo" src={img} alt="" loading="lazy" />}
                  <span className="rsn-ic"><Icon name={icon} /></span>
                  <div className="rsn-info">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
