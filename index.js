import "./config.js";
import { getEvents } from "./scraper/scraper.js";

const eventList = await getEvents();
console.log(eventList);
