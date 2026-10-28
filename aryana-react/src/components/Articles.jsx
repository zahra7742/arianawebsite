import useDragScroll from '../hooks/useDragScroll.js'
import Icon from './Icon.jsx'
import { articles } from '../data/content.js'
import ArticleCard from './ArticleCard.jsx'

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
          <a href="#/articles" className="ar-all">مشاهده همه مقالات <Icon name="chev-r" /></a>
        </div>

        <div className="ar-track" ref={trackRef}>
          {articles.map(article => <ArticleCard key={article.id} {...article} />)}
        </div>
      </div>
    </section>
  )
}
