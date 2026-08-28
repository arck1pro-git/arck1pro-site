// Otimização in-place das imagens em /public.
// Mantém nome e formato de cada arquivo (não quebra referências), apenas
// redimensiona as dimensões exageradas e recomprime. Os originais ficam no
// histórico do git caso seja preciso reverter.
//
// Uso: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, stat, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public')

// Lado maior (px) máximo por arquivo. Default cobre o resto.
const CAPS = {
  'hero.png': 2560,
  'header.png': 1920,
  'footer.jpg': 2560,
  'footerold.png': 2000,
  'footeroldd.png': 1600,
  'fabhricio.png': 1300,
  'logo.png': 855,
  'capri1.jpeg': 1600,
  'capri2.jpeg': 1600,
}
const PILAR_CAP = 1100
const PORTFOLIO_CAP = 1800
const TOURMALINE_CAP = 1672
const DEFAULT_CAP = 2000

function capFor(name) {
  if (CAPS[name]) return CAPS[name]
  if (/^pilar/i.test(name)) return PILAR_CAP
  if (/^tourmaline/i.test(name)) return TOURMALINE_CAP
  if (/^(alameda|atmohaus|carolina|paradise|erenita)/i.test(name)) return PORTFOLIO_CAP
  return DEFAULT_CAP
}

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`

async function encodeBuffer(pipeline, ext) {
  if (ext === '.jpg' || ext === '.jpeg') {
    return pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer()
  }
  // PNG: compara truecolor x paleta (libimagequant) e fica com o menor,
  // preservando qualidade alta (quality 92 + dithering evita banding visível).
  const [truecolor, palette] = await Promise.all([
    pipeline.clone().png({ compressionLevel: 9, effort: 10 }).toBuffer(),
    pipeline.clone().png({ compressionLevel: 9, effort: 10, palette: true, quality: 92, dither: 1 }).toBuffer(),
  ])
  return palette.length < truecolor.length ? palette : truecolor
}

async function run() {
  const files = (await readdir(DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f))
  let before = 0
  let after = 0
  const rows = []

  for (const name of files) {
    const full = path.join(DIR, name)
    const ext = path.extname(name).toLowerCase()
    const origSize = (await stat(full)).size
    before += origSize

    try {
      const cap = capFor(name)
      const input = sharp(full, { failOn: 'none' })
      const meta = await input.metadata()
      const longest = Math.max(meta.width ?? 0, meta.height ?? 0)

      const pipeline = sharp(full, { failOn: 'none' }).rotate()
      if (longest > cap) {
        pipeline.resize({ width: cap, height: cap, fit: 'inside', withoutEnlargement: true })
      }

      const out = await encodeBuffer(pipeline, ext)

      // Só sobrescreve se houver ganho real. Grava o buffer já codificado
      // diretamente (sem re-encodar por sharp, o que desfaria a paleta/qualidade).
      if (out.length < origSize) {
        const tmp = full + '.tmp'
        await writeFile(tmp, out)
        await unlink(full)
        await rename(tmp, full)
        after += out.length
        rows.push([name, `${meta.width}x${meta.height}`, fmt(origSize), fmt(out.length), `-${Math.round((1 - out.length / origSize) * 100)}%`])
      } else {
        after += origSize
        rows.push([name, `${meta.width}x${meta.height}`, fmt(origSize), fmt(origSize), '0% (mantido)'])
      }
    } catch (e) {
      after += origSize
      rows.push([name, '?', fmt(origSize), 'ERRO', e.message])
    }
  }

  for (const r of rows) console.log(r.map((c) => String(c).padEnd(16)).join(''))
  console.log('\n' + '='.repeat(60))
  console.log(`TOTAL  ${fmt(before)}  ->  ${fmt(after)}  (-${Math.round((1 - after / before) * 100)}%)`)
}

run()
