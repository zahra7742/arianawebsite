import Icon from './Icon.jsx'
import { features } from '../data/content.js'
import fxVisual from '../assets/photos/fx-visual.jpg'

export default function Features() {
  return (
    <section className="container fx-sec" id="features-new">
      <div className="fx">
        <div className="fx-grid">
          <div className="fx-main">
            <div className="fx-head">
              <h2 className="fx-title">آریانا کارت، بیش از یک کارت <em>بانکی</em></h2>
              <p>با آریانا کارت، تمام امور مالی روزمره را ساده، شادسریع و امن مدیریت کنید.<br />از خرید آنلاین و پرداخت فروشگاهی تا انتقال وجه و مدیریت کامل در اپلیکیشن،</p>
            </div>
            <div className="fx-cards">
              {features.map(({ icon, color, title, text, wide }) => (
                <a key={title} href="#" className={wide ? 'fx-card wide' : 'fx-card'}>
                  <span className={`fx-ic ${color}`}><Icon name={icon} /></span>
                  <div className="fx-txt"><h3>{title}</h3><p>{text}</p></div>
                  <span className="fx-go"><Icon name="chev-r" /></span>
                </a>
              ))}
            </div>
          </div>
          <div className="fx-visual" aria-hidden="true">
            <img src={fxVisual} alt="" width="1003" height="768" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
