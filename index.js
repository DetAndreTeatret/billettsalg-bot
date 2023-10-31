import "./config.js"
import {
  filterDates,
  mondayThisWeek,
  sundayThisWeek,
} from "./date_utils/parseDate.js"
import { postEventsToDiscord } from "./discord_bot/discordBot.js"
import { getEventsTicketCo } from "./ticketco_api/ticketco.js"

// Get events TICKETCO
const eventList = await getEventsTicketCo()

// Filter events this week
let eventsThisWeek = filterDates(eventList, mondayThisWeek(), sundayThisWeek())

// Post to Discord
await postEventsToDiscord(eventsThisWeek)

process.exit()
