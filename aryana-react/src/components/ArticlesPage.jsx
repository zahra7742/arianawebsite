import ArticleCard from './ArticleCard.jsx'
import { articles } from '../data/content.js'

// The list of all articles: a short heading and a grid of cards.
export default function ArticlesPage() {
  return (
    <main className="ap">
      <section className="container ap-head">
        <span className="ar-tag">مقالات</span>
        <h1>مقالات و تازه‌های آریانا</h1>
        <p>راهنماها، آموزش‌ها و تازه‌ترین اخبار برای مدیریت ساده‌تر پول شما.</p>
      </section>
      <section className="container ap-grid">
        {articles.map(article => <ArticleCard key={article.id} {...article} />)}
      </section>
    </main>
  )
}
