import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Submissions are appended to <project root>/submissions.csv (one level above aryana-react).
const CSV_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../submissions.csv')
const HEADER = ['date', 'name', 'mobile', 'type', 'message']
const TYPES = ['individual', 'business']

// Quote every field; prefix formula-like values so Excel doesn't execute them.
const csvCell = v => {
  let s = String(v ?? '').replace(/\r?\n/g, ' ')
  if (/^[=+\-@]/.test(s)) s = "'" + s
  return '"' + s.replace(/"/g, '""') + '"'
}

function validate(body) {
  if (!body || typeof body !== 'object') return 'invalid body'
  const { name, mobile, type, message = '' } = body
  if (typeof name !== 'string' || name.trim().length < 3 || name.length > 100) return 'invalid name'
  if (typeof mobile !== 'string' || !/^09\d{9}$/.test(mobile)) return 'invalid mobile'
  if (!TYPES.includes(type)) return 'invalid type'
  if (typeof message !== 'string' || message.length > 2000) return 'invalid message'
  return null
}

function appendRow(body) {
  const row = [new Date().toISOString(), body.name.trim(), body.mobile, body.type, (body.message || '').trim()]
  if (!fs.existsSync(CSV_PATH)) {
    // BOM so Excel opens the Persian text as UTF-8
    fs.writeFileSync(CSV_PATH, '﻿' + HEADER.map(csvCell).join(',') + '\r\n')
  }
  fs.appendFileSync(CSV_PATH, row.map(csvCell).join(',') + '\r\n')
}

function handler(req, res, next) {
  if (req.url !== '/api/contact') return next()
  const send = (code, obj) => {
    res.statusCode = code
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj))
  }
  if (req.method !== 'POST') return send(405, { ok: false, error: 'method not allowed' })

  let raw = ''
  req.setEncoding('utf8')
  req.on('data', chunk => {
    raw += chunk
    if (raw.length > 10_000) req.destroy()
  })
  req.on('end', () => {
    let body
    try { body = JSON.parse(raw) } catch { return send(400, { ok: false, error: 'invalid json' }) }
    const error = validate(body)
    if (error) return send(400, { ok: false, error })
    try {
      appendRow(body)
      send(200, { ok: true })
    } catch (err) {
      console.error('[contact] could not write CSV:', err)
      send(500, { ok: false, error: 'write failed' })
    }
  })
}

// Vite plugin: serves POST /api/contact in both `vite` (dev) and `vite preview`.
export default function contactCsv() {
  return {
    name: 'contact-csv',
    configureServer(server) { server.middlewares.use(handler) },
    configurePreviewServer(server) { server.middlewares.use(handler) },
  }
}
