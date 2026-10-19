import { useEffect, useRef, useState } from 'react'
import { faqs } from '../data/content.js'
import faqImg from '../assets/photos/faq.jpg'

export default function Faq() {
  // Accordion: one answer open at a time; the height animates (grid rows 0fr -> 1fr, see .acc-a in styles.css)
  const [openIndex, setOpenIndex] = useState(null)
  const accRef = useRef(null)

  // the questions rise in one after another the first time the list scrolls into view
  useEffect(() => {
    const el = accRef.current
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="faq container" id="faq">
      <div className="faq-card">
        <div className="faq-body">
          <h2 className="section-title"><span>پاسخ به سوالات رایج</span></h2>
          <div className="acc" ref={accRef}>
            {faqs.map(({ q, a }, i) => {
              const open = openIndex === i
              return (
                <div key={q} className={open ? 'acc-item open' : 'acc-item'} style={{ '--i': i }}>
                  <h3>
                    <button type="button" className="acc-q" id={`faq-q-${i}`} aria-expanded={open} aria-controls={`faq-a-${i}`}
                      onClick={() => setOpenIndex(open ? null : i)}>
                      <span className="acc-ic" aria-hidden="true" />
                      <span>{q}</span>
                    </button>
                  </h3>
                  <div className="acc-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                    <div><p>{a}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="faq-art" aria-hidden="true">
          <img src={faqImg} alt="" width="230" height="148" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
