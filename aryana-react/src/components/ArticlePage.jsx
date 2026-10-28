import Icon from './Icon.jsx'
import ArticleCard from './ArticleCard.jsx'
import markLight from '../assets/logo/aryana-mark-light.png'
import { articles } from '../data/content.js'

// The full text is a list of blocks (see the note above `articles` in content.js)
function Body({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>
    if (b.type === 'ul') return <ul key={i}>{b.items.map(item => <li key={item}>{item}</li>)}</ul>
    return <p key={i}>{b.text}</p>
  })
}

// One article: the cover, title and meta, the text, and three other articles underneath.
export default function ArticlePage({ slug }) {
  const article = articles.find(a => a.id === slug)

  if (!article) {
    return (
      <main className="ap">
        <section className="container ap-head ap-missing">
          <h1>این مقاله پیدا نشد</h1>
          <p>ممکن است نشانی را اشتباه وارد کرده باشید یا مقاله حذف شده باشد.</p>
          <a href="#/articles" className="btn btn-yellow">همه‌ی مقالات</a>
        </section>
      </main>
    )
  }

  const { tone, tag, title, excerpt, date, min, body } = article
  const related = articles.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <main className="ap">
      <article className="container ap-article">
        <a href="#/articles" className="ap-back"><Icon name="chev-r" /> همه‌ی مقالات</a>
        <div className="ap-meta"><span className="ar-tag">{tag}</span><time>{date}</time><i aria-hidden="true" /><span>{min} دقیقه مطالعه</span></div>
        <h1>{title}</h1>
        <p className="ap-lead">{excerpt}</p>
        <div className={`ar-cover ap-cover ${tone}`} aria-hidden="true"><img src={markLight} alt="" /></div>
        <div className="ap-body">
          {body?.length ? <Body blocks={body} /> : <p className="ap-todo">متن کامل این مقاله از پنل مدیریت بارگذاری می‌شود.</p>}
        </div>
      </article>

      <section className="container ap-related" aria-label="مقاله‌های دیگر">
        <h2>مقاله‌های دیگر</h2>
        <div className="ap-grid">
          {related.map(a => <ArticleCard key={a.id} {...a} />)}
        </div>
      </section>
    </main>
  )
}
