import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useMediaQuery from '../hooks/useMediaQuery.js'
import { journey } from '../data/content.js'
import frameImg from '../assets/photos/journey/Transparent iPhone Frame Mockup.webp'
import dashboardImg from '../assets/photos/journey/aryanapay-dashboard.webp'
import transferImg from '../assets/photos/journey/aryanapay-transfer.webp'
import paymentsImg from '../assets/photos/journey/aryanapay-payments.webp'

gsap.registerPlugin(ScrollTrigger)

const HEADER_H = 73 // height of the sticky site header
const screens = [dashboardImg, transferImg, paymentsImg] // one per stage, same order as `journey`

// Phone frame (fixed size and angle) with the three screenshots layered in its screen;
// only opacity changes between stages, so the phone never resizes or shifts.
function Device({ stage }) {
  return (
    <div className="jr-device">
      <div className="jr-device-screen">
        {screens.map((src, i) => (
          <img key={src} src={src} alt="" width="410" height="869" className={i === stage ? 'jr-shot on' : 'jr-shot'} />
        ))}
      </div>
      <img className="jr-device-frame" src={frameImg} alt="" width="1278" height="1230" />
    </div>
  )
}

function StageText({ item, className = '', hidden }) {
  return (
    <div className={`jr-text ${className}`} aria-hidden={hidden || undefined}>
      <span className="jr-num">{item.num}</span>
      <h2>{item.title}<br /><span>{item.accent}</span></h2>
      <p>{item.text}</p>
    </div>
  )
}

// Desktop: GSAP ScrollTrigger pins the section for two screen-heights of scrolling;
// progress picks the stage, which swaps the text, screenshot and timeline marker together.
function PinnedJourney() {
  const sectionRef = useRef(null)
  const [stage, setStage] = useState(0)

  // layout effect: GSAP must undo its pin (and the pin-spacer it wraps around the section)
  // before React removes these nodes, e.g. when the window shrinks to the mobile layout
  useLayoutEffect(() => {
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        refreshPriority: 1,
        start: `top top+=${HEADER_H}`,
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          section.style.setProperty('--p', self.progress.toFixed(4))
          setStage(Math.min(journey.length - 1, Math.floor(self.progress * journey.length)))
        },
      })
    }, section)
    return () => ctx.revert() // kills the ScrollTrigger and removes the pin spacer
  }, [])

  return (
    // React-owned wrapper: GSAP inserts its pin-spacer inside it, never in React's parent
    <div className="jr-pin-wrap" id="features-new">
      <section ref={sectionRef} className="jr-sec jr-pinned" aria-label="امکانات اپلیکیشن آریانا پی">
        <div className="container jr-stage">
          <div className="jr-line" aria-hidden="true">
            <span className="jr-fill" />
            {journey.map((item, i) => (
              <span key={item.num} className={i <= stage ? `jr-step done ${item.tone}` : 'jr-step'} style={{ top: `${(i + 0.5) / journey.length * 100}%` }} />
            ))}
            <span className={`jr-marker ${journey[stage].tone}`} />
          </div>

          {journey.map((item, i) => (
            <StageText key={item.num} item={item} className={`${i % 2 ? 'right' : 'left'}${i === stage ? ' on' : ''}`} hidden={i !== stage} />
          ))}

          <div className={stage % 2 ? 'jr-phone-slot left' : 'jr-phone-slot'} aria-hidden="true">
            <Device stage={stage} />
          </div>
        </div>
      </section>
    </div>
  )
}

// Desktop with reduced motion: the three stages as static alternating rows.
function StaticJourney() {
  return (
    <section className="container jr-sec jr-static" id="features-new" aria-label="امکانات اپلیکیشن آریانا پی">
      {journey.map((item, i) => (
        <div key={item.num} className={i % 2 ? 'jr-row flip' : 'jr-row'}>
          <StageText item={item} />
          <span className={`jr-dot ${item.tone}`} aria-hidden="true" />
          <div className="jr-phone-cell" aria-hidden="true"><Device stage={i} /></div>
        </div>
      ))}
    </section>
  )
}

// Phone whose screen scrolls: the status bar and bottom nav stay put (taken from the dashboard
// screenshot), and the three screenshots' middle parts sit in one tall strip that GSAP moves up.
function ScrollDevice({ stripRef }) {
  return (
    <div className="jr-device">
      <div className="jr-device-screen">
        <div className="jr-sv">
          <div className="jr-strip" ref={stripRef}>
            {screens.map(src => (
              <div key={src} className="jr-strip-item"><img src={src} alt="" width="410" height="869" /></div>
            ))}
          </div>
        </div>
        <img className="jr-band top" src={dashboardImg} alt="" width="410" height="869" />
        <img className="jr-band bottom" src={dashboardImg} alt="" width="410" height="869" />
      </div>
      <img className="jr-device-frame" src={frameImg} alt="" width="1278" height="1230" />
    </div>
  )
}

// Phones & tablets: GSAP pins the section under the header; the phone frame stays fixed while
// scrolling moves its screen to the next screenshot, and the text above slides along with it.
function MobilePinnedJourney() {
  const sectionRef = useRef(null)
  const stripRef = useRef(null)
  const textsRef = useRef(null)
  const lineRef = useRef(null)
  const [stage, setStage] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      // short holds around each move so the scroll mostly rests on a whole screen
      const HOLD = 0.4
      const MOVE = 1
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: MOVE },
        scrollTrigger: {
          trigger: section,
          refreshPriority: 1,
          start: `top top+=${HEADER_H}`,
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 1,
          // a short scroll in either direction glides on to the next whole screen, so the user never has to
          // drag the phone into place: every stage rests at k / (stages - 1) of the timeline
          snap: {
            snapTo: 1 / (journey.length - 1),
            directional: true,
            delay: 0.1,
            duration: { min: 0.9, max: 1.7 },
            ease: 'sine.inOut',
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            // a stage becomes active halfway through the move that brings it in
            const t = self.progress * tl.duration()
            let i = 0
            for (let k = 1; k < journey.length; k++) {
              if (t >= HOLD + (k - 1) * (MOVE + HOLD * 2) + MOVE / 2) i = k
            }
            setStage(i)
          },
        },
      })
      const targets = [stripRef.current, textsRef.current]
      tl.to({}, { duration: HOLD })
      journey.slice(1).forEach((_, k) => {
        tl.to(targets, { yPercent: (-100 / journey.length) * (k + 1) })
        // the timeline beside the phone fills and its marker moves to the next step at the same time
        tl.to(lineRef.current, { '--p': (k + 1) / (journey.length - 1) }, '<')
        tl.to({}, { duration: k < journey.length - 2 ? HOLD * 2 : HOLD })
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    // React-owned wrapper: GSAP inserts its pin-spacer inside it, never in React's parent
    <div className="jr-pin-wrap" id="features-new">
      <section ref={sectionRef} className="jr-sec jr-mpin" aria-label="امکانات اپلیکیشن آریانا پی">
        <div className="jr-mtexts">
          <div className="jr-mtexts-strip" ref={textsRef}>
            {journey.map((item, i) => <StageText key={item.num} item={item} hidden={i !== stage} />)}
          </div>
        </div>
        <div className="jr-mphone" aria-hidden="true">
          {/* the desktop's centre timeline, standing beside the phone */}
          <div className="jr-mline" ref={lineRef}>
            <span className="jr-fill" />
            {journey.map((item, i) => (
              <span key={item.num} className={i <= stage ? `jr-step done ${item.tone}` : 'jr-step'} style={{ top: `${i / (journey.length - 1) * 100}%` }} />
            ))}
            <span className={`jr-marker ${journey[stage].tone}`} />
          </div>
          <ScrollDevice stripRef={stripRef} />
        </div>
      </section>
    </div>
  )
}

// Phones & tablets with reduced motion: three normal vertical sections, no pinning.
// Observers (no scroll listeners) track which section is in the middle of the screen: that drives
// the step indicator and lets each phone crossfade from the previous stage's screen to its own.
function MobileJourney() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [active, setActive] = useState(0)
  const rowsRef = useRef([])

  useEffect(() => {
    const rows = rowsRef.current
    const middle = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(Number(en.target.dataset.i)) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    // text reveal: toggled both ways so it replays when scrolling back up
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(en => en.target.classList.toggle('in', en.isIntersecting))
    }, { threshold: 0.2 })
    rows.forEach(row => { middle.observe(row); reveal.observe(row) })
    return () => { middle.disconnect(); reveal.disconnect() }
  }, [])

  return (
    <section className="container jr-sec jr-mobile" id="features-new" aria-label="امکانات اپلیکیشن آریانا پی">
      <div className="jr-msteps" aria-hidden="true">
        {journey.map((item, i) => (
          <span key={item.num} className={i === active ? 'on' : i < active ? 'done' : undefined}>
            <b>{item.num}</b>{item.title}
          </span>
        ))}
      </div>

      {journey.map((item, i) => (
        <div key={item.num} className="jr-mrow" data-i={i} ref={el => { rowsRef.current[i] = el }}>
          <StageText item={item} />
          <div className="jr-phone-cell" aria-hidden="true">
            {/* until its section is reached, a phone still shows the previous stage's screen */}
            <Device stage={reduce || active >= i ? i : Math.max(0, i - 1)} />
          </div>
        </div>
      ))}
    </section>
  )
}

export default function Journey() {
  // fetch the frame and all three screenshots early so stage changes never flicker
  ;[frameImg, ...screens].forEach(src => preload(src, { as: 'image' }))

  const wide = useMediaQuery('(min-width: 981px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')

  if (!wide) return reduce ? <MobileJourney /> : <MobilePinnedJourney />
  return reduce ? <StaticJourney /> : <PinnedJourney />
}
