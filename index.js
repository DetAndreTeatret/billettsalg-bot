import './config.js'
import { getEvents, getArchivedEvents } from './scraper/scraper.js'
import { writeToFile } from './scraper/writeToFile.js'
import {
  dateToString,
  filterDates,
  mondayThisWeek,
  sundayThisWeek,
} from './date_utils/parseDate.js'
import { postEventsToDiscord } from './discord_bot/discordBot.js'
import { getEventsTicketCo } from './ticketco_api/ticketco.js'

// Get events TIKKIO
//const eventList = await getEvents()

// Get events TICKETCO
const eventList = await getEventsTicketCo()

//Filter events this week
let eventsThisWeek = filterDates(eventList, mondayThisWeek(), sundayThisWeek())

//Post to Discord
await postEventsToDiscord(eventsThisWeek)

process.exit()
