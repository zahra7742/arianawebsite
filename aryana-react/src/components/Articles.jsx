import useDragScroll from '../hooks/useDragScroll.js'
import { articles } from '../data/content.js'

export default function Articles() {
  const trackRef = useDragScroll()

  return (
    <section className="articles container">
      <div className="art-head">
        <h2 className="art-title">مقالات و تازه‌های آریانا</h2>
        <div className="art-nav">
          <a href="#" className="btn btn-outline btn-sm">مشاهده همه مقالات</a>
        </div>
      </div>
      <div className="art-track" ref={trackRef}>
        {articles.map(({ photo, tag, title, date }) => (
          <article key={title} className="art">
            <div className={`art-img photo ${photo}`}><span className="tag">{tag}</span></div>
            <h3>{title}</h3>
            <time>{date}</time>
          </article>
        ))}
      </div>
    </section>
  )
}
