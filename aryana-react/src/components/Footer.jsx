import Icon from './Icon.jsx'
import { footerColumns, legalLinks, socials } from '../data/content.js'
import ftArt from '../assets/photos/ft-art.jpg'
import ftLogo from '../assets/photos/ft-logo.png'
import ftCbi from '../assets/photos/ft-cbi.png'
import ftEnamad from '../assets/photos/ft-enamad.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ft-top">
        <img className="ft-art" src={ftArt} alt="" aria-hidden="true" loading="lazy" />
        <div className="container ft-grid">
          <div className="ft-brand">
            <a href="#top" className="ft-logo" aria-label="AryanaPay"><img src={ftLogo} alt="AryanaPay" width="158" height="42" /></a>
            <p>آریانا با هدف فراهم کردن دسترسی ساده، سریع و امن به خدمات مالی دیجیتال، تجربه‌ای مطمئن و قابل اعتماد برای مدیریت امور مالی روزمره شما ارائه می‌دهد.</p>
            <div className="social">
              {socials.map(({ icon, label }) => (
                <a key={label} href="#" aria-label={label}><Icon name={icon} /></a>
              ))}
            </div>
          </div>

          {footerColumns.map(({ title, links }) => (
            <nav key={title} className="ft-col" aria-label={title}>
              <h4>{title}</h4>
              {links.map(({ href, label }) => <a key={label} href={href}>{label}</a>)}
            </nav>
          ))}

          <div className="ft-side">
            <div className="ft-dl">
              <div className="ft-dl-head">
                <span className="ft-dl-ic"><Icon name="phone" /></span>
                <div><strong>دانلود اپلیکیشن آریانا</strong><small>همیشه و همه‌جا، همراه شما</small></div>
              </div>
              <div className="ft-stores">
                <a href="#" className="ft-store"><Icon name="apple" /><span><small>دانلود از</small>App Store</span></a>
                <a href="#" className="ft-store"><Icon name="gplay" /><span><small>دانلود از</small>Google Play</span></a>
              </div>
            </div>
            <div className="ft-trust-title"><span>با مجوزهای رسمی و مورد اعتماد</span></div>
            <div className="ft-badges">
              <div className="ft-badge"><img src={ftCbi} alt="" width="52" height="50" /><span>دارای مجوز از<br />بانک مرکزی جمهوری اسلامی ایران</span></div>
              <div className="ft-badge"><img src={ftEnamad} alt="eNAMAD" width="64" height="84" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="container ft-bottom-in">
          <nav className="ft-legal" aria-label="لینک‌های پایین صفحه">
            {legalLinks.map(label => <a key={label} href="#">{label}</a>)}
          </nav>
          <span className="ft-copy">تمامی حقوق این وب‌سایت متعلق به آریانا است. © ۱۴۰۳</span>
          <label className="ft-lang"><Icon name="globe" className="globe" />
            <span className="sel"><select aria-label="زبان"><option>فارسی</option><option>English</option></select><Icon name="chev-d" className="chev" /></span>
          </label>
        </div>
      </div>
    </footer>
  )
}
