import Icon from './Icon.jsx'
import appImg from '../assets/photos/app-phone.webp'

export default function AppBanner() {
  return (
    <section className="container" id="app">
      <div className="app-banner">
        <div className="app-text">
          <h2>همه چیز در <em>یک اپلیکیشن</em></h2>
          <p>کارت خود را در اپلیکیشن آریانا پی متصل کنید و حساب، پرداخت‌ها، انتقال وجه و سایر خدمات مالی به سادگی دسترسی داشته باشید.</p>
          <div className="store-row">
            <div className="qr-wrap">
              <div className="qr" aria-label="QR code"></div>
              <small>با اسکن QR دانلود کنید</small>
            </div>
            <a href="#" className="store-btn"><Icon name="gplay" /><span><small>دانلود از</small>Google Play</span></a>
            <a href="#" className="store-btn"><Icon name="apple" /><span><small>دانلود از</small>App Store</span></a>
          </div>
        </div>
        <div className="app-phones" aria-hidden="true">
          <img src={appImg} alt="" width="640" height="960" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
