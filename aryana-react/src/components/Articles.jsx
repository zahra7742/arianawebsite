import useDragScroll from '../hooks/useDragScroll.js'
import Icon from './Icon.jsx'
import { articles } from '../data/content.js'
import markLight from '../assets/logo/aryana-mark-light.png'

// Insights: a dark band. Each article is a gradient "cover" with its title on it, then the date and reading time,
// the title and a short excerpt underneath (the list scrolls sideways and can be dragged with the mouse).
export default function Articles() {
  const trackRef = useDragScroll()

  return (
    <section className="ar" id="articles" aria-label="مقالات و تازه‌های آریانا">
      <div className="container">
        <div className="ar-head">
          <div>
            <span className="ar-tag">مقالات</span>
            <h2>مقالات و تازه‌های آریانا</h2>
            <p>راهنماها، آموزش‌ها و تازه‌ترین اخبار برای مدیریت ساده‌تر پول شما.</p>
          </div>
          <a href="#" className="ar-all">مشاهده همه مقالات <Icon name="chev-r" /></a>
        </div>

        <div className="ar-track" ref={trackRef}>
          {articles.map(({ tone, tag, title, excerpt, date, min }) => (
            <a key={title} href="#" className="ar-card">
              <div className={`ar-cover ${tone}`}>
                <span className="ar-cat">{tag}</span>
                <img src={markLight} alt="" aria-hidden="true" />
              </div>
              <div className="ar-meta"><time>{date}</time><i aria-hidden="true" /><span>{min} دقیقه مطالعه</span></div>
              <h3>{title}</h3>
              <p>{excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
