import Icon from './Icon.jsx'
import aboutImg from '../assets/photos/aryana_design_assets/02_about_business_person.jpg'

export default function About() {
  return (
    <section className="about container" id="about">
      <div className="about-card">
        <div className="about-text">
          <h2>دسترسی ساده‌تر<br />به خدمات مالی برای زندگی بهتر</h2>
          <p>آریانا با هدف فراهم کردن دسترسی آسان و مطمئن اتباع واجد شرایط به خدمات مالی دیجیتال، کارت و اپلیکیشن آریانا توسعه یافته است. با تکیه بر راهکارهای واقعی، تجربه‌ای ساده، شفاف و قابل اعتماد برای مدیریت امور مالی روزمره فراهم کرده‌ایم.</p>
          <a href="#" className="btn btn-outline btn-sm">بیشتر درباره آریانا <Icon name="arrow" className="ic" /></a>
        </div>
        <div className="about-photo">
          <img src={aboutImg} alt="همراه شما در مسیری جدید" width="290" height="170" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
