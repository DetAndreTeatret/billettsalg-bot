import './config.js'
import { getEvents, getArchivedEvents } from './scraper/scraper.js'
import { writeToFile } from './scraper/writeToFile.js'
import {
  filterDates,
  mondayThisWeek,
  sundayThisWeek,
} from './scraper/parseDate.js'

// Get events

const eventList = await getEvents()

//Filter events this week
let eventsThisWeek = filterDates(eventList, mondayThisWeek(), sundayThisWeek())
onsole.log(eventsThisWeek)
