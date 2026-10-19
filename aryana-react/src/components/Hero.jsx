import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'
import cbiLogo from '../assets/photos/ft-cbi.png'
import heroPhoto from '../assets/photos/hero/tehran-hero.webp'

gsap.registerPlugin(ScrollTrigger)

const HEADER_H = 73 // height of the sticky site header

// PHOTOS: set these to imported image files to replace the placeholder gradients, e.g.
//   import heroPhoto from '../assets/photos/hero/person.jpg'  →  const PHOTOS = { hero: heroPhoto, … }
// hero: full-screen, at least ~1920px wide; side cards: portrait, at least ~600×850px.
const PHOTOS = { hero: heroPhoto, sideA: null, sideB: null }

// ILLUSTRATIVE DATA: balances and transactions below are sample figures, not real AryanaPay data.
const SIDE_CARDS = [
  {
    key: 'sideA',
    label: 'حساب ارزی · دلار',
    balance: '۳۱۲ دلار',
    row: { icon: 'cart', title: 'قهوه در کافه', sub: 'دیروز، ۰۹:۰۲', amount: '−۸۵٬۰۰۰' },
  },
  {
    key: 'sideB',
    label: 'حساب شخصی',
    balance: '۲٬۳۵۰٬۰۰۰ تومان',
    row: { icon: 'bolt', title: 'قبض برق', sub: 'سررسید امروز', amount: '−۳۴۰٬۰۰۰' },
  },
]

function Photo({ src, className }) {
  return src
    ? <img className={`rv-photo ${className}`} src={src} alt="" />
    : <div className={`rv-photo ${className} placeholder`} />
}

// The bank card shown in the big outlined frame: a vertical card, standing on the hero photo
function BankCard() {
  return (
    <div className="rv-bank" aria-hidden="true">
      <div className="rv-bank-top"><Icon name="logo" /><b>AryanaPay</b></div>
      <div className="rv-bank-mid">
        <i className="rv-chip" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 7c2.5 3 2.5 7 0 10M12 5c4 4 4 10 0 14M16 3c5.5 5 5.5 13 0 18" /></svg>
      </div>
      <div className="rv-bank-num"><span>1234 5678</span><span>9012 3456</span></div>
      <div className="rv-bank-foot"><small>VALID THRU</small><span>12/28</span></div>
    </div>
  )
}

// Light that flows along the golden wave of the hero photo. The SVG uses the photo's own pixel space and the same
// cover/left-aligned fit as the image (xMinYMid slice), so the path stays on top of the photo's wave at any size.
const WAVE = 'M-10 545 C12 546 77 542 120 548 C163 554 210 564 250 578 C290 592 327 614 360 630 C393 646 420 660 450 675 C480 690 508 708 540 722 C572 736 603 749 640 757 C677 765 720 770 760 771 C800 772 840 768 880 760 C920 752 963 732 1000 722 C1037 712 1067 706 1100 703 C1133 700 1163 703 1200 706 C1237 709 1300 719 1320 722'
// the paler white-blue line under the golden one
const WAVE_B = 'M-10 600 C5 602 53 608 80 614 C107 620 130 628 150 634 C170 640 175 642 200 653 C225 664 267 684 300 698 C333 712 367 724 400 736 C433 748 467 759 500 767 C533 775 567 781 600 786 C633 791 667 793 700 795 C733 797 767 799 800 797 C833 795 867 791 900 785 C933 779 967 768 1000 760 C1033 752 1067 744 1100 740 C1133 736 1167 735 1200 735 C1233 735 1283 739 1300 740'
function WaveGlow() {
  return (
    <svg className="rv-wave" viewBox="0 0 1756 895" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rv-wave-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1320" y2="0">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0" />
          <stop offset="0.12" stopColor="#ffe3a3" />
          <stop offset="0.8" stopColor="#fff1c9" />
          <stop offset="1" stopColor="#ffe3a3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rv-wave-fade-b" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1300" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.1" stopColor="#ffffff" />
          <stop offset="0.75" stopColor="#dff0ff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="rv-wave-glow" d={WAVE} pathLength="1000" />
      <path className="rv-wave-core" d={WAVE} pathLength="1000" />
      <path className="rv-wave-glow b" d={WAVE_B} pathLength="1000" />
      <path className="rv-wave-core b" d={WAVE_B} pathLength="1000" />
    </svg>
  )
}

// Balance overlay shared by the hero frame and the cards
function Balance({ label, amount }) {
  return (
    <div className="rv-balance">
      <span>{label}</span>
      <b>{amount}</b>
      <em>حساب‌ها</em>
    </div>
  )
}

// Revolut-style hero: a full-screen photo with the headline and a large outlined card; scrolling shrinks the
// photo into the middle card on a white screen, the outlined card rises onto it, and the side cards rise in.
export default function Hero() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isPhone = useMediaQuery('(max-width: 760px)')
  const simple = isPhone && !reduce // phones: static page, looping cards
  const stageRef = useRef(null)

  useLayoutEffect(() => {
    if (reduce) return
    const stage = stageRef.current
    const q = gsap.utils.selector(stage)
    let onRefresh
    let covers
    const setCovers = on => {
      if (on === covers) return
      covers = on
      document.documentElement.toggleAttribute('data-hero-covers', on)
      window.dispatchEvent(new Event('herocover'))
    }
    if (!simple) {
      document.documentElement.setAttribute('data-hero-photo', '')
      document.documentElement.setAttribute('data-hero-pinned', '') // at the top, before the first scroll update
    }
    let cleanup = () => {}
    let liveOn = false
    let startLive = () => {}
    let stopLive = () => {}
    const ctx = gsap.context(() => {
      // geometry of the middle card relative to the stage, re-measured on every refresh/resize
      const card = () => {
        const s = stage.getBoundingClientRect()
        const c = q('.rv-slot')[0].getBoundingClientRect()
        return { x: c.left - s.left, y: c.top - s.top, w: c.width, h: c.height, sw: s.width, sh: s.height }
      }
      const phone = c => c.sw <= 760
      // Phones, once the transition has finished: the three cards loop. The middle card is the large one and
      // the two beside it are small and washed out, only a sliver of each showing at the screen edges. Every few
      // seconds (or on a swipe) each card moves to the next place, and the one on the far side wraps behind.
      const cardsEl = q('.rv-cards')[0]
      let cards = []
      let rest = []
      let pos = [0, 1, 2] // current place of each card (0 left, 1 centre, 2 right)
      let busy = false
      let timer = 0
      const place = (i, p) => {
        const Wc = rest[1].w
        const ws = rest[0].w
        const d = Wc / 2 + rest[2].gap + ws / 2
        const cx = rest[1].cx + (p - 1) * d
        const w = p === 1 ? Wc : ws
        return { x: cx - rest[i].cx, scale: w / rest[i].w, zIndex: p === 1 ? 3 : 1, '--wash': p === 1 ? 0 : 1 }
      }
      const step = dir => {
        if (!liveOn || busy) return
        busy = true
        pos = pos.map(p => (p + dir + 3) % 3)
        cards.forEach((el, i) => gsap.to(el, {
          ...place(i, pos[i]), duration: 0.8, ease: 'power3.inOut', overwrite: 'auto',
          onComplete: i === 0 ? () => { busy = false } : undefined,
        }))
      }
      const restart = () => { clearInterval(timer); timer = setInterval(() => step(1), 3200) }
      stopLive = () => {
        if (!liveOn) return
        liveOn = false
        clearInterval(timer)
        gsap.killTweensOf(cards)
        gsap.set(cards, { x: 0, scale: 1 })
        cards.forEach(el => { el.style.removeProperty('--wash'); el.style.zIndex = '' })
        pos = [0, 1, 2]
        busy = false
        stage.classList.remove('rv-live')
      }
      startLive = () => {
        if (liveOn || card().sw > 760) return
        liveOn = true
        cards = [...q('.rv-side, .rv-slot')].sort((x, y) => x.offsetLeft - y.offsetLeft)
        const gap = parseFloat(getComputedStyle(cardsEl).columnGap) || 10
        rest = cards.map(el => ({ cx: el.offsetLeft + el.offsetWidth / 2, w: el.offsetWidth, gap }))
        cards.forEach((el, i) => gsap.set(el, place(i, i)))
        stage.classList.add('rv-live')
        restart()
      }
      let x0 = null
      const down = e => { x0 = e.clientX; clearInterval(timer) }
      const up = e => {
        if (x0 === null) return
        const dx = e.clientX - x0
        x0 = null
        if (Math.abs(dx) > 40) step(dx > 0 ? 1 : -1)
        if (liveOn) restart()
      }
      cardsEl.addEventListener('pointerdown', down)
      window.addEventListener('pointerup', up)
      cleanup = () => {
        clearInterval(timer)
        cardsEl.removeEventListener('pointerdown', down)
        window.removeEventListener('pointerup', up)
      }
      if (simple) {
        // phones: no pinned scroll animation, the page is static and only the cards loop
        // the static hero card sits under the copy, so tell the CSS where the copy ends
        const copyEl = q('.rv-copy')[0]
        const measure = () => stage.style.setProperty('--copy-b', copyEl.offsetTop + copyEl.offsetHeight + 'px')
        measure()
        document.fonts?.ready.then(measure)
        startLive()
        // header colour, as on desktop: see-through with light text while the photo is under it, then it turns white
        const onScroll = () => {
          const over = stage.getBoundingClientRect().bottom > HEADER_H
          document.documentElement.toggleAttribute('data-hero-pinned', over)
          setCovers(over)
        }
        onScroll()
        // the card animation replays every time the hero comes back into view: while it is off screen the
        // animations are switched off (rv-reset), and removing the class starts them again from the beginning
        const heroCard = q('.rv-hero-card')[0]
        const io = new IntersectionObserver(([e]) => {
          heroCard.classList.toggle('rv-reset', !e.isIntersecting)
          stage.classList.toggle('rv-reset', !e.isIntersecting) // also restarts the download button's tremble
        })
        io.observe(heroCard)
        const onResize = () => { measure(); stopLive(); startLive(); onScroll() }
        window.addEventListener('resize', onResize)
        window.addEventListener('scroll', onScroll, { passive: true })
        const prev = cleanup
        cleanup = () => {
          prev()
          io.disconnect()
          heroCard.classList.remove('rv-reset')
          stage.classList.remove('rv-reset')
          window.removeEventListener('resize', onResize)
          window.removeEventListener('scroll', onScroll)
        }
        return
      }
      const tl = gsap.timeline({
        defaults: { ease: 'sine.inOut', force3D: true },
        scrollTrigger: {
          trigger: stage,
          refreshPriority: 3, // the pins refresh in page order (hero, goals, journey), whatever order they were created in
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          // short catch-up: enough to ease out wheel steps, without the floaty lag of a long scrub
          scrub: 0.8,
          anticipatePin: 1,
          // a short scroll in either direction carries the whole transition through on its own
          snap: {
            snapTo: [0, 1],
            directional: true,
            delay: 0.05,
            duration: { min: 0.9, max: 1.8 },
            ease: 'power2.inOut',
          },
          invalidateOnRefresh: true,
          onUpdate: self => {
            document.documentElement.toggleAttribute('data-hero-pinned', self.progress < 1)
            if (self.progress >= 0.999) startLive(); else stopLive()
          },
        },
      })
      // hero copy drifts up and out first
      tl.to(q('.rv-copy'), { autoAlpha: 0, y: -80, duration: 0.9 }, 0)
      // where the hero's outlined card sits on the first screen: fully on screen, beside the headline
      // (below the copy on phones). Returned as a rect in stage coordinates.
      const heroRect = () => {
        const c = card()
        const s = stage.getBoundingClientRect()
        // layout position of the copy (offsets ignore the transform GSAP gives it while it fades out)
        const copyEl = q('.rv-copy')[0]
        const copy = { left: copyEl.offsetLeft, bottom: copyEl.offsetTop + copyEl.offsetHeight }
        let w, cx, top
        if (phone(c)) {
          top = copy.bottom + 28
          w = Math.min((c.sh - top - 24) * (c.w / c.h), c.sw * 0.74)
          cx = c.sw / 2
        } else {
          // headline text box, so the card never runs into it
          const r = document.createRange()
          r.selectNodeContents(q('.rv-copy h1')[0])
          const h1Left = r.getBoundingClientRect().left - s.left
          // a bit smaller than before; just left of the middle of the screen and a little below its centre, clear of the headline
          w = Math.min((c.sh - HEADER_H) * 0.64 * (c.w / c.h), c.sw * 0.28)
          cx = Math.max(w / 2 + 24, Math.min(c.sw * 0.46, h1Left - 40 - w / 2))
          top = (c.sh - w * (c.h / c.w)) / 2 + c.sh * 0.06
        }
        const h = w * (c.h / c.w)
        return { x: cx - w / 2, y: top, w, h, scale: w / c.w }
      }
      const inset = (r, c, radius) => `inset(${r.y}px ${c.sw - r.x - r.w}px ${c.sh - r.y - r.h}px ${r.x}px round ${radius}px)`

      // step 1: the full-screen photo closes in on the outlined card; white comes in from the edges
      // The clip is driven by three progress values, so the corner radius can ramp up on its own: the photo is
      // square-cornered at the page corners, gets its full 22px radius quickly, and keeps it to the very end.
      const clipEl = q('.rv-clip')[0]
      const st = { a: 0, b: 0, rad: 0 } // a: step 1, b: step 2, rad: corner radius (0..1)
      let geo = null // measured once per refresh, not on every frame
      const mix = (p, q2, t) => ({ x: p.x + (q2.x - p.x) * t, y: p.y + (q2.y - p.y) * t, w: p.w + (q2.w - p.w) * t, h: p.h + (q2.h - p.h) * t })
      const paint = () => {
        if (!geo) {
          const c = card()
          geo = { c, hero: heroRect(), full: { x: 0, y: 0, w: c.sw, h: c.sh }, slot: { x: c.x, y: c.y, w: c.w, h: c.h } }
        }
        const rect = mix(mix(geo.full, geo.hero, st.a), geo.slot, st.b)
        clipEl.style.clipPath = inset(rect, geo.c, 22 * st.rad)
        // the header stays see-through while the photo still reaches the top of the screen
        setCovers(rect.y < 36)
      }
      onRefresh = () => { geo = null; stopLive() } // re-measured on the next frame
      ScrollTrigger.addEventListener('refreshInit', onRefresh)
      paint()
      // step 1: the full-screen photo closes in on the outlined card; white comes in from the edges
      tl.to(st, { a: 1, duration: 1.8, ease: 'sine.in', onUpdate: paint }, 0)
      tl.to(st, { rad: 1, duration: 0.3, ease: 'power2.out', onUpdate: paint }, 0)
      // step 2: photo and card travel together, rising and shrinking into the middle card
      tl.to(st, { b: 1, duration: 1, ease: 'sine.out', onUpdate: paint }, 1.8)
      tl.fromTo(q('.rv-frame'),
        {
          scale: () => heroRect().scale,
          // the frame is scaled down, so counter-scale its radius to keep the corners at 22px on screen
          borderRadius: () => 22 / heroRect().scale,
          // the card scales around its top centre, so line up centres horizontally and tops vertically
          x: () => { const r = heroRect(); const c = card(); return r.x + r.w / 2 - (c.x + c.w / 2) },
          y: () => { const r = heroRect(); const c = card(); return r.y - c.y },
          '--outline': 1,
        },
        { scale: 1, borderRadius: 22, x: 0, y: 0, '--outline': 0, duration: 1, ease: 'sine.out', immediateRender: true }, 1.8)
      // a gentle zoom-out of the photo while it closes in (it always still covers the whole stage)
      tl.fromTo(q('.rv-clip .rv-photo, .rv-clip .rv-wave'), { scale: 1.1 }, { scale: 1, duration: 2.8 }, 0)
      // the next screen rises in once the photo has landed: heading first, then the side cards one by one
      tl.from(q('.rv-next-head > *'), { autoAlpha: 0, y: 50, stagger: 0.12, duration: 0.9 }, 2.3)
      // side cards: come in from the outer edges, travelling diagonally upward, zoomed out and tilted,
      // and settle straight into place. Long, gently eased tweens keep the motion slow and fluid.
      const fromSide = dir => ({
        autoAlpha: 0,
        x: () => dir * card().sw * 0.3,
        y: () => card().sh * 0.22,
        scale: 0.7,
        rotation: dir * 16,
        duration: 1.1,
      })
      tl.from(q('.rv-side.a'), fromSide(1), 2.6) // right-hand card (first in RTL), from the right edge
      tl.from(q('.rv-side.b'), fromSide(-1), 2.75) // left-hand card, from the left edge
      tl.from(q('.rv-slot-foot'), { autoAlpha: 0, y: 24, duration: 0.7 }, 3.2)
      // a short hold at the end, so the finished screen rests before the page scrolls on
      tl.to({}, { duration: 0.25 })
    }, stage)
    return () => {
      document.documentElement.removeAttribute('data-hero-photo')
      document.documentElement.removeAttribute('data-hero-pinned')
      setCovers(false)
      cleanup()
      stopLive()
      ScrollTrigger.removeEventListener('refreshInit', onRefresh)
      ctx.revert()
      stage.querySelector('.rv-clip').style.clipPath = ''
    }
  }, [reduce, isPhone])

  return (
    // React-owned wrapper: GSAP inserts its pin-spacer inside it, never in React's parent
    <div className="rv-wrap">
      <section ref={stageRef} className={reduce || isPhone ? 'rv rv-static' : 'rv'} aria-labelledby="rv-title">
        <div className="rv-clip" aria-hidden="true">
          <Photo src={PHOTOS.hero} className="hero" />
          <WaveGlow />
        </div>

        {/* phones: the big outlined card stays put on the blue hero (desktop animates the one inside the middle card) */}
        <div className="rv-hero-card" aria-hidden="true">
          <div className="rv-hero-card-in">
            <BankCard />
            <div className="rv-hero-foot">
              <img src={cbiLogo} alt="" width="26" height="25" />
              <span>مجوز بانک مرکزی</span>
              <i><Icon name="shield" /></i>
              <span>پرداخت امن</span>
            </div>
          </div>
          {/* a copy that falls over beside the standing card and lies on its side over the photo */}
          <div className="rv-hero-fall">
            <BankCard />
            <div className="rv-hero-fall-photo"><Photo src={PHOTOS.hero} className="hero" /></div>
          </div>
        </div>

        <div className="rv-copy container">
          <h1 id="rv-title">مدیریت مالی، ساده</h1>
          <p>آریانا کارت، کارت بانکی ویژه اتباع است که امکان پرداخت، خرید، انتقال وجه و مدیریت حساب را به سادگی از طریق اپلیکیشن آریانا پی برای شما فراهم می‌کند.</p>
          <a href="#app" className="rv-btn"><Icon name="download" /> دانلود اپلیکیشن</a>
        </div>

        <div className="rv-next container">
          <div className="rv-next-head">
            <h2>مدیریت پول، به شکلی تازه</h2>
            <p>هوشمندانه خرج کنید، سریع انتقال دهید و پس‌اندازتان را رشد دهید — همه با آریانا کارت.</p>
            <a href="#contact" className="rv-btn">دریافت آریانا کارت</a>
          </div>

          <div className="rv-cards">
            <SideCard card={SIDE_CARDS[0]} side="a" />
            <MiddleSlot />
            <SideCard card={SIDE_CARDS[1]} side="b" />
          </div>
        </div>
      </section>
    </div>
  )
}

function SideCard({ card, side }) {
  return (
    <article className={`rv-side ${side}`} aria-label={card.label}>
      <Photo src={PHOTOS[card.key]} className={card.key} />
      <Balance label={card.label} amount={card.balance} />
      <div className="rv-row">
        <i><Icon name={card.row.icon} /></i>
        <span><b>{card.row.title}</b><small>{card.row.sub}</small></span>
        <em>{card.row.amount}</em>
      </div>
    </article>
  )
}

// The middle card: the hero photo lands here, and the hero's outlined card shrinks onto it.
function MiddleSlot() {
  return (
    <div className="rv-slot">
      <Photo src={PHOTOS.hero} className="hero slot-photo" />
      <div className="rv-frame">
        <BankCard />
      </div>
      <div className="rv-slot-foot">
        <img src={cbiLogo} alt="" width="26" height="25" />
        <span>مجوز بانک مرکزی</span>
        <i><Icon name="shield" /></i>
        <span>پرداخت امن</span>
      </div>
    </div>
  )
}
