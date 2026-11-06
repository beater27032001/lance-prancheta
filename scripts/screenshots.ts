// Gera os prints do README: npm run build && npm run screenshots
import { spawn } from 'node:child_process'

import { chromium, type Page } from 'playwright'

interface Shot {
  name: string
  width: number
  height: number
  full?: boolean
  /** Prepara a página antes do print. */
  setup?: (page: Page) => Promise<void>
}

const playFor = (ms: number) => async (page: Page) => {
  await page.locator('button:has-text("Play")').click()
  await page.waitForTimeout(ms)
  await page.locator('button:has-text("Pausa")').click()
}
const toBoard = (page: Page) =>
  page.locator('[aria-label="Posição na jogada"]').scrollIntoViewIfNeeded()
const scrollThrough = (page: Page) =>
  page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })

const SHOTS: Shot[] = [
  { name: 'desktop', width: 1440, height: 900, setup: playFor(3100) },
  {
    name: 'desktop-escanteio',
    width: 1440,
    height: 900,
    setup: async (p) => {
      await p.getByRole('button', { name: 'Escanteio ensaiado' }).click()
      await p.waitForTimeout(700)
      await p.getByRole('button', { name: /Cruzamento fechado/ }).click()
      await p.waitForTimeout(700)
      await p.locator('button:has-text("Pausa")').click()
    },
  },
  { name: 'tablet', width: 820, height: 1180, setup: playFor(2200) },
  {
    name: 'mobile',
    width: 390,
    height: 844,
    setup: async (p) => {
      await playFor(2600)(p)
      await toBoard(p)
    },
  },
  {
    name: 'mobile-full',
    width: 390,
    height: 844,
    full: true,
    setup: async (p) => {
      await playFor(1800)(p)
      await scrollThrough(p)
    },
  },
]

const server = spawn('node_modules/.bin/next', ['start', '-p', '4173'])
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes('Ready') && resolve(null))
  server.on('exit', (code) => reject(new Error(`next start saiu com ${code}`)))
})
const browser = await chromium.launch()
const errors: string[] = []

for (const shot of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
  })
  page.on('pageerror', (e) => errors.push(`${shot.name}: ${e.message}`))
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)
  if (shot.setup) {
    await shot.setup(page)
    await page.waitForTimeout(800)
  }
  await page.screenshot({ path: `docs/${shot.name}.png`, fullPage: shot.full })
  await page.close()
}

await browser.close()
server.kill()
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('prints salvos em docs/')
