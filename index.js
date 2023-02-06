import './config.js'
import { getEvents, getArchivedEvents } from './scraper/scraper.js'
import { writeToFile } from './scraper/writeToFile.js'
import {
  filterDates,
  mondayThisWeek,
  sundayThisWeek,
} from './scraper/parseDate.js'
import { postEventsToDiscord } from './discord_bot/discordBot.js'

// Get events

const eventList = await getEvents()

//Filter events this week
let eventsThisWeek = filterDates(eventList, mondayThisWeek(), sundayThisWeek())

//console.log(eventsThisWeek)
//Post events to discord-channel
await postEventsToDiscord(eventsThisWeek)

process.exit()
