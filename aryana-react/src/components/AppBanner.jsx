import Icon from './Icon.jsx'
import frameImg from '../assets/photos/journey/Transparent iPhone Frame Mockup.webp'
import screenImg from '../assets/photos/journey/aryanapay-payments.webp'

// DIRECT_URL: the direct download link of the app (e.g. the .apk file). Replace "#" with the real address.
const DIRECT_URL = '#'

export default function AppBanner() {
  return (
    <section className="container" id="app">
      <div className="app-banner">
        <div className="app-text">
          <h2>همه چیز در <em>یک اپلیکیشن</em></h2>
          <p>کارت خود را در اپلیکیشن آریانا پی متصل کنید و حساب، پرداخت‌ها، انتقال وجه و سایر خدمات مالی به سادگی دسترسی داشته باشید.</p>
          <div className="store-row">
            <a href={DIRECT_URL} className="store-btn" download><Icon name="download" /><span><small>دانلود با لینک</small>دانلود مستقیم</span></a>
            <a href="#" className="store-btn"><Icon name="gplay" /><span><small>دانلود از</small>Google Play</span></a>
            <a href="#" className="store-btn"><Icon name="apple" /><span><small>دانلود از</small>App Store</span></a>
          </div>
        </div>
        {/* the AryanaPay screen in a phone turned in 3D: its left side nearer, its top leaning to the right */}
        <div className="app-phones app-phones-3d" aria-hidden="true">
          <div className="jr-device">
            <div className="jr-device-screen">
              <img className="jr-shot on" src={screenImg} alt="" width="640" height="1226" loading="lazy" />
            </div>
            <img className="jr-device-frame" src={frameImg} alt="" width="1278" height="1230" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
