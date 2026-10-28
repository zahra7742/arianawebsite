import markLight from '../assets/logo/aryana-mark-light.png'

// One article card (gradient cover, date and reading time, title, excerpt); it opens the article's page.
export default function ArticleCard({ id, tone, tag, title, excerpt, date, min }) {
  return (
    <a href={`#/articles/${id}`} className="ar-card">
      <div className={`ar-cover ${tone}`}>
        <span className="ar-cat">{tag}</span>
        <img src={markLight} alt="" aria-hidden="true" />
      </div>
      <div className="ar-meta"><time>{date}</time><i aria-hidden="true" /><span>{min} دقیقه مطالعه</span></div>
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </a>
  )
}
