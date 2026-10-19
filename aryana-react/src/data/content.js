export const navLinks = [
  { href: '#top', label: 'خانه' },
  { href: '#about', label: 'آریانا کارت' },
  { href: '#features-new', label: 'امکانات' },
  { href: '#app', label: 'اپلیکیشن' },
  { href: '#faq', label: 'سوالات متداول' },
  { href: '#about', label: 'درباره ما' },
]

export const features = [
  { icon: 'phone', color: 'blue', title: 'مدیریت در اپلیکیشن', text: 'مشاهده موجودی، تاریخچه تراکنش‌ها و کنترل کامل کارت' },
  { icon: 'card', color: 'yellow', title: 'کارت به کارت', text: 'انتقال وجه سریع و آسان' },
  { icon: 'store', color: 'yellow', title: 'پرداخت در فروشگاه‌ها', text: 'از طریق کارت‌خوان (POS) در تمام پذیرندگان' },
  { icon: 'cart', color: 'blue', title: 'خرید آنلاین', text: 'از فروشگاه‌های داخلی و بین‌المللی' },
  { icon: 'shield', color: 'blue', title: 'امنیت و اطمینان', text: 'با استانداردهای بانکی و فناوری‌های امنیتی پیشرفته', wide: true },
]

// Highlights: three glass pills on each side of the card + phone
export const highlights = {
  left: [
    { icon: 'globe', tone: 'yellow', title: 'کارت بین‌المللی', text: 'خرید از میلیون‌ها فروشگاه در سراسر جهان' },
    { icon: 'phone', tone: 'blue', title: 'مدیریت در اپلیکیشن', text: 'مشاهده موجودی، تاریخچه و کنترل کامل کارت' },
    { icon: 'shield', tone: 'green', title: 'امنیت و اطمینان', text: 'با استانداردهای بین‌المللی و فناوری‌های امنیتی پیشرفته' },
  ],
  right: [
    { icon: 'bolt', tone: 'purple', title: 'انتقال سریع وجه', text: 'در هر زمان و مکان' },
    { icon: 'cart', tone: 'blue', title: 'خرید آنلاین', text: 'از فروشگاه‌های داخلی و بین‌المللی' },
    { icon: 'chart', tone: 'pink', title: 'کنترل هزینه‌ها', text: 'گزارش‌های دقیق و دسته‌بندی هوشمند' },
  ],
}

// Journey: the three scroll-driven stages (text + phone screen)
export const journey = [
  {
    num: '01',
    title: 'مدیریت حساب',
    accent: 'در یک نگاه',
    text: 'موجودی، تراکنش‌ها و کارت‌های خود را به‌صورت لحظه‌ای در اپلیکیشن آریانا پی مشاهده و مدیریت کنید.',
    tone: 'yellow',
  },
  {
    num: '02',
    title: 'کارت به کارت',
    accent: 'سریع و امن',
    text: 'به‌سادگی و در چند ثانیه، به کارت یا حساب دلخواه وجه منتقل کنید.',
    tone: 'navy',
  },
  {
    num: '03',
    title: 'پرداخت‌های روزمره',
    accent: 'در یک اپلیکیشن',
    text: 'قبض‌ها، خرید شارژ، بسته اینترنت و سایر خدمات را به‌صورت آنلاین و بدون نیاز به مراجعه حضوری پرداخت کنید.',
    tone: 'yellow',
  },
]

export const trustItems = [
  { icon: 'headset', title: 'پشتیبانی پاسخگو', text: 'در تمام مراحل' },
  { icon: 'handshake', title: 'همکاری با شرکای معتبر', text: 'در حوزه مالی' },
  { icon: 'lock', title: 'حفظ حریم خصوصی', text: 'اطلاعات شما' },
  { icon: 'shield', title: 'ارائه خدمات پایدار', text: 'با زیرساخت مطمئن' },
]

export const faqs = [
  {
    q: 'آریانا کارت چیست و چه کسانی می‌توانند از آن استفاده کنند؟',
    a: 'آریانا کارت یک کارت بانکی ویژه اتباع واجد شرایط است که از طریق اپلیکیشن آریانا پی مدیریت می‌شود.',
  },
  {
    q: 'دریافت کارت چه مدارکی لازم است؟',
    a: 'مدارک لازم شامل مدارک شناسایی معتبر است. لیست کامل در اپلیکیشن نمایش داده می‌شود.',
  },
  {
    q: 'از طریق چه روش‌هایی می‌توان حساب را شارژ کرد؟',
    a: 'می‌توانید از طریق کارت به کارت، انتقال بانکی یا مراجعه به شرکای معتبر حساب خود را شارژ کنید.',
  },
  {
    q: 'آیا امکان استفاده از کارت در خریدهای اینترنتی وجود دارد؟',
    a: 'بله، کارت شما برای خرید از فروشگاه‌های اینترنتی داخلی و بین‌المللی قابل استفاده است.',
  },
  {
    q: 'اپلیکیشن آریانا پی را از کجا دانلود کنم؟',
    a: 'اپلیکیشن را از دکمه‌های دانلود در همین صفحه، یعنی گوگل‌پلی، اپ‌استور یا لینک مستقیم، دریافت کنید.',
  },
]

export const articles = [
  { photo: 'photo-edu', tag: 'آموزش', title: 'مدیریت پرداخت‌های روزمره با اپلیکیشن آریانا پی', date: '۱۴۰۴/۰۸/۱۰' },
  { photo: 'photo-city2', tag: 'اخبار', title: 'توسعه خدمات آریانا برای سازمان‌ها و شرکت‌ها', date: '۱۴۰۴/۰۴/۱۸' },
  { photo: 'photo-hand', tag: 'راهنما', title: 'چطور حساب آریانا کارت خود را شارژ کنیم؟', date: '۱۴۰۴/۰۴/۲۷' },
  { photo: 'photo-edu', tag: 'آموزش', title: 'آشنایی با امکانات اپلیکیشن آریانا پی', date: '۱۴۰۴/۰۳/۲۰' },
  { photo: 'photo-hand', tag: 'راهنما', title: 'نکات امنیتی برای استفاده از کارت بانکی', date: '۱۴۰۴/۰۳/۰۸' },
  { photo: 'photo-city2', tag: 'اخبار', title: 'معرفی ویژگی‌های جدید آریانا کارت', date: '۱۴۰۴/۰۲/۲۵' },
]

export const socials = [
  { icon: 'insta', label: 'Instagram' },
  { icon: 'x', label: 'X' },
  { icon: 'telegram', label: 'Telegram' },
  { icon: 'linkedin', label: 'LinkedIn' },
  { icon: 'youtube', label: 'YouTube' },
]

export const footerColumns = [
  {
    title: 'محصولات',
    links: [
      { href: '#about', label: 'آریانا کارت' },
      { href: '#app', label: 'اپلیکیشن' },
      { href: '#features-new', label: 'امکانات' },
      { href: '#', label: 'تعرفه‌ها' },
    ],
  },
  {
    title: 'خدمات',
    links: [
      { href: '#', label: 'خرید آنلاین' },
      { href: '#', label: 'پرداخت فروشگاهی' },
      { href: '#', label: 'کارت به کارت' },
      { href: '#', label: 'مدیریت در اپلیکیشن' },
      { href: '#', label: 'امنیت و اطمینان' },
    ],
  },
  {
    title: 'درباره آریانا',
    links: [
      { href: '#about', label: 'درباره ما' },
      { href: '#', label: 'فرصت‌های شغلی' },
      { href: '#', label: 'اخبار و مقالات' },
      { href: '#', label: 'تماس با ما' },
    ],
  },
  {
    title: 'پشتیبانی',
    links: [
      { href: '#faq', label: 'سوالات متداول' },
      { href: '#', label: 'راهنمای استفاده' },
      { href: '#', label: 'شرایط و قوانین' },
      { href: '#', label: 'حریم خصوصی' },
    ],
  },
]

export const legalLinks = ['نقشه سایت', 'حریم خصوصی', 'شرایط و قوانین', 'تماس با ما']
