import puppeteer from 'puppeteer'

export async function startBrowser() {
  return puppeteer.launch({
    headless: true,
    args: ['--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
    DISPLAY: ':10.0',
  })
}
