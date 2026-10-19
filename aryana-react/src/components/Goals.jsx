import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'
import photoA from '../assets/photos/hero/tehran-alborz.webp'
import lineArt from '../assets/photos/hero/tehran-alborz-line.webp' // the same skyline as a colourless line drawing

gsap.registerPlugin(ScrollTrigger)

const HEADER_H = 73 // height of the sticky site header

// PHOTO: only the Tehran skyline on white (tehran-alborz.webp), used for every goal for now. Replace `photo` with real lifestyle photos (at least ~1920px wide) for each goal.
// ILLUSTRATIVE DATA: goal names and amounts are sample figures, not real AryanaPay data.
const GOALS = [
  { key: 'trip', tab: 'سفر', label: 'سفر به استانبول', amount: '۴٬۷۸۰ دلار', photo: photoA, pos: '0% 100%' },
  { key: 'wedding', tab: 'ازدواج', label: 'جشن عروسی', amount: '۱۲٬۴۰۰ دلار', photo: photoA, pos: '0% 100%' },
  { key: 'moving', tab: 'اسباب‌کشی', label: 'خانه‌ی جدید', amount: '۸٬۲۰۰ دلار', photo: photoA, pos: '0% 100%' },
]

// A full-width photo with a centred headline, a small glass "goal" card and the goal card.
export default function Goals() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const goal = GOALS[0]
  const sectionRef = useRef(null)

  // the section is pinned: the photo stays put and, as the user scrolls down, the texts, button and card
  // appear one by one on top of it (at the start only the photo is there)
  useLayoutEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section)
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          refreshPriority: 2,
          start: `top top+=${HEADER_H}`,
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      // the picture starts as a colourless line drawing and takes its colours while the texts come up.
      // the sketch is alone for a moment, then the texts follow one after another, and the colours finish with the card
      tl.fromTo(q('.gl-bg img.on'), { opacity: 0 }, { opacity: 1, ease: 'power1.inOut', duration: 3.7 }, 0.5)
        .fromTo(q('.gl-line'), { opacity: 1 }, { opacity: 0, ease: 'power1.inOut', duration: 3.7 }, 0.5)
        .from(q('h2'), { autoAlpha: 0, y: 40, duration: 1 }, 0.8)
        .from(q('.gl-lead'), { autoAlpha: 0, y: 30, duration: 0.9 }, 1.4)
        .from(q('.gl-note'), { autoAlpha: 0, y: 24, duration: 0.8 }, 1.95)
        .from(q('.gl-cta'), { autoAlpha: 0, y: 16, scale: 0.92, duration: 0.8 }, 2.5)
        .from(q('.gl-bank'), { autoAlpha: 0, y: 40, duration: 1.1 }, 3.1) // only once the button has settled, so the two never overlap
        .to({}, { duration: 3.6 }, 4.2) // everything is in place by 4.2: the finished screen rests for a moment before the page scrolls on
    }, section)
    return () => ctx.revert()
  }, [reduce])

  return (
    // React-owned wrapper: GSAP inserts its pin-spacer inside it, never in React's parent
    <div className="gl-wrap" id="about">
      <section ref={sectionRef} className="gl" aria-label="هدف‌های مالی">
        <div className="gl-bg" aria-hidden="true">
          <img src={goal.photo} alt="" className="on" style={{ objectPosition: goal.pos }} loading="lazy" />
          <img src={lineArt} alt="" className="gl-line" style={{ objectPosition: goal.pos }} />
        </div>

        <div className="gl-body container">
          <h2>زندگی، همراه با هدف‌هایتان</h2>
          <p className="gl-lead">برای هر هدف یک حساب جدا بسازید و مسیر رسیدن به آن را در اپلیکیشن آریانا پی دنبال کنید.</p>
          <p className="gl-note">مبلغ‌ها و هدف‌های نشان‌داده‌شده نمونه هستند و فقط برای نمایش آورده شده‌اند.</p>
          <a href="#app" className="gl-cta">دانلود اپلیکیشن</a>

          {/* a bank card (drawn in CSS, so it stays sharp at any size) in place of the old glass box */}
          <div className="gl-bank" aria-hidden="true">
            <div className="gl-bank-top"><Icon name="logo" /><b>AryanaPay</b></div>
            <div className="gl-bank-mid">
              <i className="gl-chip" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 7c2.5 3 2.5 7 0 10M12 5c4 4 4 10 0 14M16 3c5.5 5 5.5 13 0 18" /></svg>
            </div>
            <div className="gl-bank-num">1234 5678 9012 3456</div>
            <div className="gl-bank-foot">
              <span>ARIANA PAY</span>
              <i className="gl-mc"><b /><b /></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
