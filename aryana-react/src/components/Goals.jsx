import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useMediaQuery from '../hooks/useMediaQuery.js'
import logoLight from '../assets/logo/aryana-logo-light.png'
import markLight from '../assets/logo/aryana-mark-light.png'
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
  const isPhone = useMediaQuery('(max-width: 760px)')
  const goal = GOALS[0]
  const sectionRef = useRef(null)

  // Desktop: the section is pinned: the photo stays put and, as the user scrolls down, the texts, button and card
  // appear one by one on top of it (at the start only the photo is there).
  // Phones: no pinned scrolling to push through; the same sequence plays by itself (on time, not on scroll) as soon as
  // the section comes into view, and plays again each time it is reached again.
  useLayoutEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section)
      const tl = gsap.timeline(isPhone
        ? { defaults: { ease: 'power2.out' }, paused: true }
        : {
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: section,
            refreshPriority: 2,
            start: `top top+=${HEADER_H}`,
            end: () => `+=${window.innerHeight * 2.4}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      // the picture starts as a colourless line drawing and takes its colours while the texts come up.
      // Desktop (scrubbed by scrolling): the sketch is alone for a moment, then the texts follow one after another,
      // and the colours finish with the card. Phones (plays by itself): no waiting, the first text is there almost at
      // once and the rest follows quickly.
      const t = isPhone
        ? { img: 0.1, imgDur: 3.2, h2: 0, lead: 0.12, note: 0.6, cta: 0.85, bank: 1.3, bankDur: 0.9, rest: 2.0 }
        : { img: 0.5, imgDur: 3.7, h2: 0.8, lead: 1.4, note: 1.95, cta: 2.5, bank: 3.1, bankDur: 1.1, rest: 4.2 }
      // Both pictures are opaque (white background). The colour photo lies underneath at full strength and only the
      // sketch on top fades out, so the picture is a straight blend from sketch to colour: fading both would let the
      // white page show through in the middle and the picture would dip towards pale.
      tl.fromTo(q('.gl-line'), { opacity: 1 }, { opacity: 0, ease: 'sine.inOut', duration: t.imgDur }, t.img)
        .from(q('h2'), { autoAlpha: 0, y: 40, duration: isPhone ? 0.42 : 1 }, t.h2)
        .from(q('.gl-lead'), { autoAlpha: 0, y: 30, duration: isPhone ? 0.45 : 0.9 }, t.lead)
        .from(q('.gl-note'), { autoAlpha: 0, y: 24, duration: isPhone ? 0.6 : 0.8 }, t.note)
        .from(q('.gl-cta'), { autoAlpha: 0, y: 16, scale: 0.92, duration: isPhone ? 0.6 : 0.8 }, t.cta)
        .from(q('.gl-bank-wrap'), { autoAlpha: 0, y: 40, duration: t.bankDur }, t.bank) // only once the button has settled, so the two never overlap
        .to({}, { duration: 2 }, t.rest) // everything is in place by then: the finished screen rests for a moment before the page scrolls on
      if (isPhone) {
        tl.timeScale(1.2)
        ScrollTrigger.create({
          trigger: section,
          start: 'top 88%', // as soon as the section is on its way in, not once it is well inside
          end: 'bottom 15%',
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: () => tl.progress(1).pause(),
          onLeaveBack: () => tl.pause(0),
        })
      }
    }, section)
    return () => ctx.revert()
  }, [reduce, isPhone])

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

          {/* the Aryana card from the brandbook, drawn in CSS: the front over the back (with its magnetic stripe),
              floating together. */}
          <div className="gl-bank-wrap" aria-hidden="true">
            <div className="gl-shadow" />
            <div className="gl-cards">
              <div className="gl-back">
                <i className="gl-stripe" />
              </div>
              <div className="gl-bank">
                <img className="gl-wm" src={markLight} alt="" />
                <div className="gl-bank-top"><img src={logoLight} alt="" /></div>
                <div className="gl-bank-mid">
                  <i className="gl-chip" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 7c2.5 3 2.5 7 0 10M12 5c4 4 4 10 0 14M16 3c5.5 5 5.5 13 0 18" /></svg>
                </div>
                <div className="gl-bank-num">1234 5678 9101 2134</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
