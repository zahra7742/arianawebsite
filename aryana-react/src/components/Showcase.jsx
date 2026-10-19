import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'

// A messy pile of content cards that turns by itself: every few seconds the next card comes to the front and the
// text beside the pile changes with it. SAMPLE TEXT: replace the tag, titles, card texts and details with your own.
const TAG = 'درباره آریانا'

const CARDS = [
  {
    icon: 'card', tone: 'blue', title: 'کارت بانکی ویژه اتباع',
    text: 'کارتی که برای اتباع واجد شرایط صادر می‌شود و همه‌چیز آن از طریق اپلیکیشن قابل مدیریت است.',
    detail: 'آریانا کارت با هدف دسترسی آسان و مطمئن اتباع واجد شرایط به خدمات مالی ساخته شده است. پرداخت، خرید، انتقال وجه و مدیریت حساب، همه با یک کارت و یک اپلیکیشن.',
  },
  {
    icon: 'bolt', tone: 'yellow', title: 'انتقال سریع وجه',
    text: 'در هر زمان و مکان، با چند ضربه به کارت یا حساب دیگر پول منتقل کنید.',
    detail: 'انتقال وجه در چند ثانیه و بدون مراجعه حضوری. مقصد را انتخاب کنید، مبلغ را بزنید و نتیجه را همان لحظه در اپلیکیشن ببینید.',
  },
  {
    icon: 'shield', tone: 'green', title: 'امنیت و اطمینان',
    text: 'با استانداردهای بانکی و فناوری‌های امنیتی، از پول و اطلاعات شما محافظت می‌شود.',
    detail: 'هر تراکنش با لایه‌های امنیتی بانکی محافظت می‌شود و کنترل کامل کارت، از جمله مسدود کردن آن، همیشه در دست خودتان است.',
  },
]

export default function Showcase() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = CARDS.length

  // turns by itself; stops while the pointer is over the section, and not at all with reduced motion
  useEffect(() => {
    if (reduce || paused) return
    const t = setInterval(() => setActive(a => (a + 1) % n), 4500)
    return () => clearInterval(t)
  }, [reduce, paused, n])

  const cur = CARDS[active]

  return (
    <section className="sc container" aria-label="درباره آریانا" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="sc-text">
        <span className="sc-tag">{TAG}</span>
        <h2 key={active}>{cur.title}</h2>
        <p key={'p' + active} aria-live="polite">{cur.detail}</p>
        <div className="sc-dots" aria-hidden="true">
          {CARDS.map((c, i) => <i key={c.title} className={i === active ? 'on' : undefined} />)}
        </div>
        <a href="#app" className="sc-open">دریافت اپلیکیشن <Icon name="arrow" /></a>
      </div>

      <div className="sc-stage" aria-hidden="true">
        <div className="sc-stack">
          {CARDS.map((c, i) => {
            const pos = (i - active + n) % n // 0 = in front
            return (
              <article key={c.title} className={`sc-card ${c.tone} p${pos}`}>
                <span className={`sc-ic ${c.tone}`}><Icon name={c.icon} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
