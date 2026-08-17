import "./config.js"
import { postEventsToDiscord } from "./discord_bot/discordBot.js"
import { getEventsTickster } from "./tickster_api/tickster.js";

// Get events Tickster, filtered to this weeks shows only
const eventList = await getEventsTickster()

// Post to Discord
await postEventsToDiscord(eventList)

process.exit()
