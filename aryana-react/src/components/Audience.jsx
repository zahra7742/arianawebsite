import Icon from './Icon.jsx'

export default function Audience() {
  return (
    <section className="audience container">
      <h2 className="section-title"><span>برای افراد و کسب‌وکارها</span></h2>
      <p className="section-sub">آریانا کارت راهکاری مالی برای زندگی روزمره و فعالیت‌های کاری شماست.</p>
      <div className="aud-grid">
        <article className="aud-card">
          <div className="aud-img photo photo-man2"></div>
          <span className="aud-ic"><Icon name="person" /></span>
          <div className="aud-body">
            <h3>برای افراد</h3>
            <p>مدیریت مالی شخصی، پرداخت‌های روزمره و خریدهای آنلاین</p>
          </div>
          <a href="#" className="btn btn-soft btn-sm">اطلاعات بیشتر</a>
        </article>
        <article className="aud-card">
          <div className="aud-img photo photo-city"></div>
          <span className="aud-ic"><Icon name="building" /></span>
          <div className="aud-body">
            <h3>برای سازمان‌ها و شرکت‌ها</h3>
            <p>ثبت درخواست گروهی و ارائه کارت برای کارکنان و همکاران اتباع</p>
          </div>
          <a href="#" className="btn btn-soft btn-sm">درخواست همکاری <Icon name="arrow" className="ic" /></a>
        </article>
      </div>
    </section>
  )
}
