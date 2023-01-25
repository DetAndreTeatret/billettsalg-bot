const url = 'https://tikkio.com/manager/events'

// .env constants
const email = process.env.EMAIL
const pass = process.env.PASSWORD

// css selectors
const gpdrSelector = '#gdpr-accept'

const loginBtnSelector = '.submit-login-user'
const emailSelector = 'input[name="email"]'
const passwordSelector = 'input[name="password"]'

const eventsLoadedID = '#search-list'
const eventSelector = '.event-bar-row'

// scraper function

export async function scrapeEvents(browser) {
  const page = await browser.newPage()
  console.log(`Navigating to ${url}...`)
  await page.goto(url)

  // Check for GPDR popup and click to remove
  if (page.waitForSelector(gpdrSelector)) {
    await page.click(gpdrSelector)
    console.log('GPDR accepted')
  }

  await page.waitForNavigation()

  //Check if already logged in, and log in if not.
  if (page.waitForSelector(loginBtnSelector)) {
    await page.waitForSelector(emailSelector)
    await page.type(emailSelector, email)
    console.log('Email entered')
    await page.type(passwordSelector, pass)
    console.log('password entered')
    await page.click(loginBtnSelector)
    console.log('Logging in...')
  }

  //Get list of events and tickets
  await page.waitForSelector(eventsLoadedID)
  console.log('Events done loading')

  const eventlist = await page.$$eval(eventSelector, (events) => {
    const eventDate = '.event-date'
    const eventName = '.event-name'
    const eventTicketsSold = '.sold'

    events.forEach((event) => {
      event['date'] = event
        .querySelector(eventDate)
        .textContent.replace(/^\s+|\s+$/g, '')
      event['name'] = event
        .querySelector(eventName)
        .textContent.replace(/^\s+|\s+$/g, '')
      event['sold'] = event.querySelector(eventTicketsSold).textContent
    })

    return events
  })

  await browser.close()
  return eventlist
}
