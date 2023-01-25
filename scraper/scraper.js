import { startBrowser } from './browser.js'
import { scrapeEvents } from './eventScraper.js'

export async function getEvents() {
  let events
  try {
    // Create browser instance
    const browser = await startBrowser()
    // Pass the browser instance to the scraper controller
    events = await scrapeEvents(browser)
  } catch (err) {
    console.log('Browser erroring somewhere => ', err)
  }
  return events
}
