import Icon from './Icon.jsx'
import { trustItems } from '../data/content.js'

export default function Trust() {
  return (
    <section className="trust container">
      <h2 className="section-title"><span>اعتماد <em>بیشتر</em> در کنار شما</span></h2>
      <p className="section-sub">آریانا کارت با رعایت اصول امنیتی، تجربه‌ای مطمئن و پایدار برای شما فراهم می‌کند.</p>
      <div className="trust-row">
        {trustItems.map(({ icon, title, text }) => (
          <div key={title} className="trust-item">
            <Icon name={icon} />
            <div><strong>{title}</strong><small>{text}</small></div>
          </div>
        ))}
      </div>
    </section>
  )
}
