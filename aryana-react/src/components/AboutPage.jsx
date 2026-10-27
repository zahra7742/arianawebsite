import Icon from './Icon.jsx'
import cardFront from '../assets/photos/card-front.png'
import frameImg from '../assets/photos/journey/Transparent iPhone Frame Mockup.webp'
import transferImg from '../assets/photos/journey/aryanapay-transfer.webp'
import skylineImg from '../assets/photos/hero/tehran-alborz.webp'
import heroPhoto from '../assets/photos/hero/tehran-hero.webp'
import ftCbi from '../assets/photos/ft-cbi.png'
import ftEnamad from '../assets/photos/ft-enamad.png'

// SAMPLE TEXT: every text on this page (the story, mission, vision, the three points under the hero, the four words, the
// product cards) is a placeholder: replace it with your own words. There are no invented numbers, ratings, years, team
// photos or client logos: when you have real figures, put them in the `WORDS` band (it is built for numbers).
const TILES = [
  { icon: 'card', title: 'ماموریت ما', text: 'دسترسی ساده، سریع و امن به خدمات مالی دیجیتال برای همه‌ی کسانی که به آن نیاز دارند.' },
  { icon: 'chart', title: 'چشم‌انداز ما', text: 'مدیریت پول به شکلی تازه، آسان و قابل اعتماد، چه برای یک نفر و چه برای یک سازمان.' },
  { icon: 'shield', title: 'تعهد ما', text: 'امنیت اطلاعات و پول شما، و شفافیت در هر قدم، از ثبت‌نام تا آخرین تراکنش.' },
]
const WORDS = [
  { word: 'ساده', text: 'هر کاری که با پول دارید، در چند لمس.' },
  { word: 'سریع', text: 'پرداخت و انتقال وجه در چند ثانیه.' },
  { word: 'امن', text: 'لایه‌های امنیتی بانکی روی هر تراکنش.' },
  { word: 'شفاف', text: 'موجودی و هزینه‌ها همیشه جلوی چشم شماست.' },
]
const SERVICES = [
  { icon: 'card', title: 'آریانا کارت', kind: 'card' },
  { icon: 'phone', title: 'اپلیکیشن آریانا پی', kind: 'phone' },
  { icon: 'bolt', title: 'انتقال وجه', kind: 'photo' },
]

function Phone({ shot, className = '' }) {
  return (
    <div className={`opt-phone ${className}`} aria-hidden="true">
      <div className="jr-device">
        <div className="jr-device-screen">
          <img className="jr-shot on" src={shot} alt="" width="410" height="869" loading="lazy" />
        </div>
        <img className="jr-device-frame" src={frameImg} alt="" width="1278" height="1230" loading="lazy" />
      </div>
    </div>
  )
}

// an anchor link would change the page (the route is the hash), so the buttons scroll by themselves
const scrollTo = id => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function AboutPage() {
  return (
    <main className="opt">
      {/* hero: a short, plain block (no background): the text about us, centred, and the three tiles under it */}
      <section className="opt-hero">
        <div className="container opt-hero-grid">
          <div className="opt-hero-copy">
            <span className="opt-tag">درباره آریانا</span>
            <h1>ما آریانا هستیم؛ همراه شما در مسیر مالی ساده‌تر</h1>
            <p>
              آریانا با یک باور شروع شد: دسترسی به خدمات مالی دیجیتال باید ساده، سریع و امن باشد. ما آریانا کارت و
              اپلیکیشن آریانا پی را ساخته‌ایم تا پرداخت، خرید، انتقال وجه و مدیریت حساب را برای شما در یک جا جمع کنیم.
            </p>
            <div className="opt-actions">
              <button type="button" className="opt-btn" onClick={scrollTo('opt-about')}>داستان ما <Icon name="arrow" /></button>
              <button type="button" className="opt-btn opt-btn-ghost" onClick={scrollTo('opt-values')}>ارزش‌های ما</button>
            </div>
          </div>
        </div>

        <div className="container opt-tiles">
          <button type="button" className="opt-tile-photo" onClick={scrollTo('opt-about')}>
            <img src={skylineImg} alt="" />
            <span className="opt-tile-photo-label"><b>داستان ما</b><small>بیشتر بخوانید <Icon name="arrow" /></small></span>
          </button>
          <div className="opt-tile-dark">
            {TILES.map(({ icon, title, text }) => (
              <article key={title}>
                <span className="opt-ic"><Icon name={icon} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="opt-about" className="container opt-about">
        <div className="opt-about-left">
          <img className="opt-about-photo" src={heroPhoto} alt="" loading="lazy" />
          <div className="opt-line">
            <span className="opt-ic opt-ic-soft"><Icon name="lock" /></span>
            <div>
              <h3>مجوز و اعتماد</h3>
              <p>آریانا با مجوز رسمی بانک مرکزی و نماد اعتماد الکترونیک فعالیت می‌کند.</p>
              <div className="opt-licences">
                <img src={ftCbi} alt="" width="52" height="50" />
                <img src={ftEnamad} alt="eNAMAD" width="64" height="84" />
              </div>
            </div>
          </div>
        </div>
        <div className="opt-about-right">
          <span className="opt-tag opt-tag-light">داستان ما</span>
          <h2>ساخته شده تا مدیریت مالی، دغدغه‌ی کمتری باشد</h2>
          <p className="opt-story">
            اتباع واجد شرایط برای کارهای مالی روزمره به راهی ساده و قابل اعتماد نیاز دارند. ما آریانا را ساختیم تا این
            مسیر کوتاه‌تر، روشن‌تر و امن‌تر باشد؛ با کارتی که همه‌جا همراه شماست و اپلیکیشنی که همه‌چیز را در یک نگاه
            نشان می‌دهد.
          </p>
          <div className="opt-line">
            <span className="opt-ic opt-ic-soft"><Icon name="users" /></span>
            <div>
              <h3>برای مردم ساخته‌ایم</h3>
              <p>هر چیزی که می‌سازیم با یک پرسش شروع می‌شود: این کار برای کاربر ساده‌تر می‌شود یا نه؟ اگر نه، دوباره می‌سازیمش.</p>
            </div>
          </div>
          <div className="opt-pill">
            <Icon name="handshake" />
            <span>با ما همراه شوید تا مدیریت مالی را ساده‌تر کنیم.</span>
            <a href="#app" className="opt-pill-btn">دانلود</a>
          </div>
        </div>
      </section>

      <section id="opt-values" className="container opt-words" aria-label="ارزش‌های ما">
        {WORDS.map(({ word, text }) => (
          <article key={word}>
            <strong>{word}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="opt-services">
        <div className="container">
          <div className="opt-services-head">
            <div>
              <span className="opt-tag opt-tag-light">آنچه می‌سازیم</span>
              <h2>محصولاتی که برای ساده‌تر شدن زندگی مالی شما ساخته‌ایم</h2>
            </div>
            <div className="opt-services-side">
              <p>کارت، اپلیکیشن و انتقال وجه؛ همه در یک تجربه‌ی یکپارچه و روشن.</p>
              <a href="#app" className="opt-pill-btn">دانلود اپلیکیشن</a>
            </div>
          </div>
          <div className="opt-cards">
            {SERVICES.map(({ icon, title, kind }) => (
              <article key={title} className={`opt-card opt-card-${kind}`}>
                <div className="opt-card-art" aria-hidden="true">
                  {kind === 'card' && <img src={cardFront} alt="" width="800" height="504" loading="lazy" />}
                  {kind === 'phone' && <Phone shot={transferImg} />}
                  {kind === 'photo' && <img className="opt-card-img" src={heroPhoto} alt="" loading="lazy" />}
                </div>
                <div className="opt-card-label"><span className="opt-ic"><Icon name={icon} /></span><b>{title}</b><Icon name="arrow" /></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
