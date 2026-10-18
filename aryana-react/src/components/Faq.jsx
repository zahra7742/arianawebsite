import { useState } from 'react'
import { faqs } from '../data/content.js'
import faqImg from '../assets/photos/faq.jpg'

export default function Faq() {
  // Accordion: keep one FAQ open at a time
  const [openIndex, setOpenIndex] = useState(null)

  const onToggle = (i, e) => {
    const isOpen = e.currentTarget.open
    setOpenIndex(cur => (isOpen ? i : cur === i ? null : cur))
  }

  return (
    <section className="faq container" id="faq">
      <div className="faq-card">
        <div className="faq-body">
          <h2 className="section-title"><span>پاسخ به سوالات رایج</span></h2>
          <div className="acc">
            {faqs.map(({ q, a }, i) => (
              <details key={q} open={openIndex === i} onToggle={e => onToggle(i, e)}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="faq-art" aria-hidden="true">
          <img src={faqImg} alt="" width="230" height="148" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
