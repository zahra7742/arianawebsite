import Icon from './Icon.jsx'
import { highlights } from '../data/content.js'
import centerImg from '../assets/photos/features-center.webp'

function Pill({ icon, tone, title, text }) {
  return (
    <a href="#" className={`hl-pill ${tone}`}>
      <span className="hl-go"><Icon name="chev-r" /></span>
      <div className="hl-txt">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <span className="hl-ic"><Icon name={icon} /></span>
    </a>
  )
}

export default function Highlights() {
  return (
    <section className="container hl-sec" aria-label="امکانات آریانا کارت">
      <div className="hl-grid">
        <div className="hl-col hl-left">
          {highlights.left.map(item => <Pill key={item.title} {...item} />)}
        </div>

        <div className="hl-center" aria-hidden="true">
          <img src={centerImg} alt="" width="820" height="735" loading="lazy" />
        </div>

        <div className="hl-col hl-right">
          {highlights.right.map(item => <Pill key={item.title} {...item} />)}
        </div>
      </div>
    </section>
  )
}
