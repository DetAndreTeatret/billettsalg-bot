import './config.js'
import { getEvents } from './scraper/scraper.js'
import {
  filterDates,
  mondayThisWeek,
  sundayThisWeek,
} from './scraper/parseDate.js'

// Get events
const eventList = await getEvents()

// Filter events this week
let eventsThisWeek = filterDates(eventList, mondayThisWeek(), sundayThisWeek())
console.log(eventsThisWeek)
