import { useState } from 'react'

// Defaults to the local Vite endpoint (server/contactCsv.js), which appends to submissions.csv.
// Set VITE_FORM_ENDPOINT in a .env file to POST submissions to a different server.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'

const emptyForm = { name: '', mobile: '', type: 'individual', message: '' }

// Persian/Arabic digits -> Latin, so "۰۹۱۲..." validates like "0912..."
const toLatinDigits = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 3) errors.name = 'نام و نام خانوادگی را وارد کنید.'
  if (!/^09\d{9}$/.test(toLatinDigits(form.mobile.trim()))) errors.mobile = 'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).'
  return errors
}

async function submitRequest(data) {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
}

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: undefined }))
    if (status !== 'sending') setStatus('idle')
  }

  const onSubmit = async e => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    try {
      await submitRequest({
        name: form.name.trim(),
        mobile: toLatinDigits(form.mobile.trim()),
        type: form.type,
        message: form.message.trim(),
      })
      setForm(emptyForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact container" id="contact">
      <div className="contact-card">
        <h2 className="section-title"><span>درخواست <em>آریانا کارت</em></span></h2>
        <p className="section-sub">اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند.</p>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="cf-name">نام و نام خانوادگی</label>
            <input id="cf-name" name="name" type="text" autoComplete="name" value={form.name} onChange={onChange}
              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
            {errors.name && <small id="cf-name-err" className="field-err">{errors.name}</small>}
          </div>

          <div className="field">
            <label htmlFor="cf-mobile">شماره موبایل</label>
            <input id="cf-mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="tel" dir="ltr" placeholder="09xxxxxxxxx"
              value={form.mobile} onChange={onChange}
              aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? 'cf-mobile-err' : undefined} />
            {errors.mobile && <small id="cf-mobile-err" className="field-err">{errors.mobile}</small>}
          </div>

          <div className="field wide">
            <label htmlFor="cf-type">نوع درخواست</label>
            <select id="cf-type" name="type" value={form.type} onChange={onChange}>
              <option value="individual">برای خودم (فرد)</option>
              <option value="business">برای سازمان یا شرکت</option>
            </select>
          </div>

          <div className="field wide">
            <label htmlFor="cf-message">توضیحات (اختیاری)</label>
            <textarea id="cf-message" name="message" rows="4" value={form.message} onChange={onChange}></textarea>
          </div>

          <div className="contact-actions">
            <button type="submit" className="btn btn-yellow btn-lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'در حال ارسال…' : 'ثبت درخواست'}
            </button>
            <p className={status === 'error' ? 'form-msg err' : 'form-msg'} role="status">
              {status === 'success' && 'درخواست شما ثبت شد. به‌زودی با شما تماس می‌گیریم.'}
              {status === 'error' && 'ارسال انجام نشد. لطفاً دوباره تلاش کنید.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
