import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import cardFront from '../assets/photos/card-front.png'
import frameImg from '../assets/photos/journey/Transparent iPhone Frame Mockup.webp'
import paymentsImg from '../assets/photos/journey/aryanapay-payments.webp'
import dashboardImg from '../assets/photos/journey/aryanapay-dashboard.webp'

// SAMPLE TEXT: the texts on this page (hero, the list of abilities, the five app tabs, the product cards) are written from what is known
// about the cards and the app: check them before publishing. There are no invented numbers, ratings, years, team photos or client logos.
// The dollar card has no picture yet: the back of a card stands in for it (hero and product cards): replace it with the real picture.
const SERVICES = [
  { icon: 'card', title: 'کارت ریالی', text: 'کارت‌به‌کارت و خرید روزمره', kind: 'card' },
  { icon: 'phone', title: 'اپلیکیشن آریانا پی', text: 'کیف پول، شارژ سریع و فروشگاه', kind: 'phone' },
  { icon: 'globe', title: 'کارت دلاری', text: 'شارژ دلاری و انتقال', kind: 'dollar' },
]

// the five tabs of the bottom bar of the app (same names and icons, right to left), around the phone (two on its left, three on its right, at different distances like a sketch)
// what the story section lists, "what we have set up"
const ABILITIES = [
  'کارت ریالی برای کارت‌به‌کارت و خرید روزمره',
  'کارت دلاری با شارژ دلاری و انتقال',
  'کارت‌های بانکی عضو شبکه شتاب',
  'شارژ حساب اپلیکیشن‌ها و ابزارهای هوش مصنوعی',
  'خرید مستقیم از فروشگاه‌های مختلف',
  'کیف پول ریالی و مدیریت کارت‌ها در یک اپلیکیشن',
]

const FEATURES = [
  { icon: 'card', title: 'کارت‌ها', text: 'کارت‌های ریالی و دلاری شما را نشان می‌دهد و مدیریت آن‌ها، انتقال و مسدودسازی را در اختیارتان می‌گذارد.' },
  { icon: 'store', title: 'فروشگاه', text: 'خرید از فروشگاه‌های مختلف را از داخل اپلیکیشن ممکن می‌کند.' },
  { icon: 'bolt', title: 'شارژ سریع', text: 'حساب را با کارت‌به‌کارت و رمز پویا در چند ثانیه شارژ می‌کند.' },
  { icon: 'wallet', title: 'کیف پول', text: 'موجودی ریالی، ریز حساب و آمار، و شارژ ارزی را در یک جا نشان می‌دهد.' },
  { icon: 'person', title: 'پروفایل', text: 'اطلاعات حساب، سطح احراز هویت و تنظیمات شما اینجاست.' },
]

function Phone({ shot, className = '' }) {
  return (
    <div className={`opt-phone ${className}`} aria-hidden="true">
      <div className="jr-device">
        <div className="jr-device-screen">
          <img className="jr-shot on" src={shot} alt="" width="640" height="1226" loading="lazy" />
        </div>
        <img className="jr-device-frame" src={frameImg} alt="" width="1278" height="1230" loading="lazy" />
      </div>
    </div>
  )
}

export default function AboutPage() {
  const artRef = useRef(null)
  const stageRef = useRef(null)
  const featRef = useRef(null)

  // The two cards are two-sided and make one full turn (360°) around their upright axis as the page scrolls: --s is 0 when the cards are
  // near the middle of the screen and ±1 at its bottom/top edge; the CSS turns the cards with it. Not with reduced motion (they just stand).
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const art = artRef.current
    let frame = 0
    let target = 0
    let shown = 0
    // the scroll sets a target; the shown turn eases slowly towards it every frame; the turn is linear in the scroll (no speeding up in the middle)
    const update = () => {
      frame = 0
      shown += (target - shown) * 0.05
      if (Math.abs(target - shown) < 0.0005) shown = target
      art.style.setProperty('--s', shown.toFixed(4))
      if (shown !== target) frame = requestAnimationFrame(update)
    }
    const request = () => {
      const r = art.getBoundingClientRect()
      const vh = window.innerHeight
      const d = (r.top + r.height / 2 - vh / 2) / vh
      target = Math.sign(d) * Math.min(1, Math.max(0, (Math.abs(d) - 0.08) / 1.15))
      if (!frame) frame = requestAnimationFrame(update)
    }
    request()
    shown = target
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  // The feature boxes come out of the phone as the page scrolls: each one starts at the centre of the phone (small and invisible, behind
  // it) and travels to its place. --e goes from 0 to 1 on the stage, --dx/--dy are each box's way back to the phone, measured from the layout
  // (offsets do not include transforms). The section is pinned under the header while they come out, and holds still for a pause once they are all
  // out: they come out while the stage scrolls up to its place, and the pinning starts exactly when they are all out. On a phone-width layout, or with reduced motion, the boxes simply stand in place.
  useEffect(() => {
    const stage = stageRef.current
    const feat = featRef.current
    const pin = feat.querySelector('.opt-feat-pin')
    const boxes = [...stage.querySelectorAll('.opt-feat-box')]
    const phone = stage.querySelector('.opt-feat-phone')
    const still = matchMedia('(prefers-reduced-motion: reduce)')
    const narrow = matchMedia('(max-width: 980px)')
    let frame = 0
    let pinTop = 0
    let stageTop = 0 // where the stage stands on the screen while the section is pinned
    let run = 1 // the scroll distance the section stays pinned for
    const measure = () => {
      const moving = !narrow.matches && !still.matches
      // the section stays where the phone and all the boxes are fully on the screen, just under the header (the heading above has
      // scrolled away by then); when the screen is taller than that, the stage is centred in what is left under the header
      stageTop = Math.max(100, Math.min(150, (window.innerHeight + 73 - stage.offsetHeight) / 2))
      pinTop = stageTop - stage.offsetTop
      run = window.innerHeight * 0.5
      feat.style.minHeight = moving ? `${pin.offsetHeight + run}px` : ''
      pin.style.top = moving ? `${pinTop}px` : ''
      boxes.forEach((box) => {
        const dx = narrow.matches ? 0 : phone.offsetLeft + phone.offsetWidth / 2 - (box.offsetLeft + box.offsetWidth / 2)
        const dy = narrow.matches ? 0 : phone.offsetTop + phone.offsetHeight / 2 - (box.offsetTop + box.offsetHeight / 2)
        box.style.setProperty('--dx', `${dx}px`)
        box.style.setProperty('--dy', `${dy}px`)
      })
    }
    // the scroll sets a target; the shown value eases towards it every frame (smooth even with a mouse wheel), and each box
    // starts a little after the one before it and moves with an ease-in-out curve
    let target = 1
    let shown = 1
    const update = () => {
      frame = 0
      shown += (target - shown) * 0.07
      if (Math.abs(target - shown) < 0.0005) shown = target
      boxes.forEach((box, i) => {
        const t = Math.min(1, Math.max(0, (shown - i * 0.07) / 0.72))
        box.style.setProperty('--e', (t * t * (3 - 2 * t)).toFixed(4))
      })
      if (shown !== target) frame = requestAnimationFrame(update)
    }
    const request = () => {
      // the boxes come out while the stage scrolls up to its place; once it is there (and they are all out) the section holds still for a moment
      target = still.matches || narrow.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.95 - stage.getBoundingClientRect().top) / (window.innerHeight * 0.95 - stageTop)))
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onResize = () => { measure(); request() }
    measure()
    request()
    shown = target
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <main className="opt">
      {/* hero: a light band: a centred headline and a short sentence, three tiles (the middle one raised) and the mission line */}
      <section className="opt-hero">
        <div className="container">
          <span className="opt-tag opt-tag-light">درباره آریانا</span>
          <h1>آریانا؛ خدمات مالی، <span>ساده و یکپارچه</span></h1>
          <p className="opt-hero-lead">
            مدیریت کیف پول ریالی، صدور کارت‌های بانکی عضو شبکه شتاب و دسترسی به خدمات پرداخت بین‌المللی؛ همه در یک اپلیکیشن.
          </p>
          <p className="opt-hero-lead">
            با آریانا، پرداخت‌های روزمره و تراکنش‌های بین‌المللی خود را ساده‌تر، سریع‌تر و یکپارچه‌تر مدیریت کنید.
          </p>
          <div className="opt-hero-tiles" aria-hidden="true">
            <figure className="opt-tile opt-tile-card">
              <img src={cardFront} alt="" width="800" height="504" />
              <figcaption>کارت ریالی</figcaption>
            </figure>
            <figure className="opt-tile opt-tile-phone">
              <Phone shot={paymentsImg} />
              <figcaption>اپلیکیشن آریانا پی</figcaption>
            </figure>
            {/* the dollar card is not ready yet: its place shows the back of a card for now (replace with the dollar card's picture) */}
            <figure className="opt-tile opt-tile-card">
              <div className="opt-tile-back">
                <svg viewBox="0 0 800 504" preserveAspectRatio="none">
                  <rect y="80" width="800" height="90" fill="#0a1830" />
                  <rect x="64" y="226" width="460" height="66" rx="8" fill="#e4e9f1" />
                  <rect x="560" y="226" width="130" height="66" rx="8" fill="#fff" />
                  <text x="736" y="450" textAnchor="end" fontSize="40" fontWeight="800" fill="rgba(255,255,255,0.5)">Aryana</text>
                </svg>
              </div>
              <figcaption>کارت دلاری</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="opt-about" className="container opt-about">
        <div className="opt-about-right">
          <span className="opt-tag opt-tag-light">داستان ما</span>
          <h2>آنچه برای شما فراهم کرده‌ایم</h2>
          <p className="opt-story">در آریانا این امکانات را برقرار کرده‌ایم تا کارهای مالی‌تان در یک جا انجام شود:</p>
          <ul className="opt-story-list">
            {ABILITIES.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="opt-about-left">
          <div className="opt-cards-art" ref={artRef} aria-hidden="true">
            <div className="opt-flip opt-flip-front">
              <img className="opt-face" src={cardFront} alt="" width="800" height="504" loading="lazy" />
              <div className="opt-face opt-face-back opt-face-turned">
                <svg viewBox="0 0 800 504" preserveAspectRatio="none">
                  <rect y="80" width="800" height="90" fill="#0a1830" />
                  <rect x="64" y="226" width="460" height="66" rx="8" fill="#e4e9f1" />
                  <rect x="560" y="226" width="130" height="66" rx="8" fill="#fff" />
                  <text x="736" y="450" textAnchor="end" fontSize="40" fontWeight="800" fill="rgba(255,255,255,0.5)">Aryana</text>
                </svg>
              </div>
            </div>
            <div className="opt-flip opt-flip-rear">
              <div className="opt-face opt-face-back">
                <svg viewBox="0 0 800 504" preserveAspectRatio="none">
                  <rect y="80" width="800" height="90" fill="#0a1830" />
                  <rect x="64" y="226" width="460" height="66" rx="8" fill="#e4e9f1" />
                  <rect x="560" y="226" width="130" height="66" rx="8" fill="#fff" />
                  <text x="736" y="450" textAnchor="end" fontSize="40" fontWeight="800" fill="rgba(255,255,255,0.5)">Aryana</text>
                </svg>
              </div>
              <img className="opt-face opt-face-turned" src={cardFront} alt="" width="800" height="504" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* features: a light panel with a headline and four boxes; the phone stands on its side and overlaps its edge */}
      <section className="container opt-feat" ref={featRef}>
        <div className="opt-feat-pin">
        <div className="opt-feat-text">
          <span className="opt-tag opt-tag-light">خدمات متنوع</span>
          <h2>هر آنچه برای کارهای مالی روزمره لازم دارید، در یک اپلیکیشن</h2>
          <p>از پرداخت و خرید تا انتقال وجه و مدیریت حساب؛ ساده، سریع و امن، بدون رفت‌وآمد و پیچیدگی اضافه.</p>
        </div>
        <div className="opt-feat-stage" ref={stageRef}>
          {[FEATURES.slice(3), FEATURES.slice(0, 3)].map((group, g) => (
            <div key={g} className={`opt-feat-side opt-feat-side-${g ? 'r' : 'l'}`}>
              {group.map(({ icon, title, text }) => (
                <div key={title} className="opt-feat-box">
                  <span className="opt-ic opt-ic-soft"><Icon name={icon} /></span>
                  <b>{title}</b>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          ))}
          <Phone shot={dashboardImg} className="opt-feat-phone" />
        </div>
        </div>
      </section>

      <section className="opt-services">
        <div className="container">
          <div className="opt-services-head">
            <div>
              <span className="opt-tag opt-tag-light">آنچه می‌سازیم</span>
              <h2>دو کارت و یک اپلیکیشن</h2>
            </div>
            <div className="opt-services-side">
              <p>کارت ریالی، کارت دلاری و اپلیکیشن آریانا پی؛ همه در یک تجربه‌ی یکپارچه و روشن.</p>
              <a href="#app" className="opt-pill-btn">دانلود اپلیکیشن</a>
            </div>
          </div>
          <div className="opt-cards">
            {SERVICES.map(({ icon, title, text, kind }) => (
              <article key={title} className={`opt-card opt-card-${kind}`}>
                <div className="opt-card-art" aria-hidden="true">
                  {kind === 'card' && <img src={cardFront} alt="" width="800" height="504" loading="lazy" />}
                  {kind === 'phone' && <Phone shot={paymentsImg} />}
                  {/* the dollar card is not ready yet: the back of a card stands in for it (replace with its picture) */}
                  {kind === 'dollar' && (
                    <div className="opt-card-back">
                      <svg viewBox="0 0 800 504" preserveAspectRatio="none">
                        <rect y="80" width="800" height="90" fill="#0a1830" />
                        <rect x="64" y="226" width="460" height="66" rx="8" fill="#e4e9f1" />
                        <rect x="560" y="226" width="130" height="66" rx="8" fill="#fff" />
                        <text x="736" y="450" textAnchor="end" fontSize="40" fontWeight="800" fill="rgba(255,255,255,0.5)">Aryana</text>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="opt-card-label"><span className="opt-ic opt-ic-soft"><Icon name={icon} /></span><span className="opt-card-name"><b>{title}</b><small>{text}</small></span><Icon name="arrow" /></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
