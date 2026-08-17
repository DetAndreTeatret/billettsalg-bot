import { filterDates, mondayThisWeek, sundayThisWeek } from "../date_utils/parseDate.js";

const ticksterToken = process.env.API_TOKEN;
const ticksterArrangerID = process.env.API_ARRANGER;
const ticksterLogin = Buffer.from(process.env.API_LOGIN).toString("base64")

const eventsEndpoint = `https://event.api.tickster.com/api/v1.0/nb/organizers/${ticksterArrangerID}/events?take=20&skip=0`;
const salesTrackerEndpoint = `https://api.tickster.com/sv/api/0.4/crm/${ticksterArrangerID}/statistics/{event}/tickets?key=${ticksterToken}`;

export async function getEventsTickster() {

  const response = await fetch(eventsEndpoint,
    {
      headers: {
        "x-api-key": ticksterToken,
        "accept": "application/json",
        "Authorization":  "Basic " + ticksterLogin
      }
    });
  console.log("Requesting data from Tickster API");
  const eventData = await response.json();

  // Some events are part of a production. Since the parent production is also returned as an event, we need to smoke them out
  let productions = []
  eventData.items.forEach(e => {
    const parentEventId = e.parentEventId
    if (parentEventId && !productions.includes(parentEventId)) {
      productions.push(parentEventId);
    }
  })

  const filteredEvents = filterDates(eventData.items.filter(ed => ed.parentEventId !== null || !productions.includes(ed.id.toUpperCase())).map((event) => ({
    id: event.id,
    name: event.name,
    date: new Date(event.startUtc)
  })), mondayThisWeek(), sundayThisWeek());

  console.log("Event data recieved, fetching sales");

  for await (const event of filteredEvents) {
    const response = await fetch(salesTrackerEndpoint.replace("{event}", event.id), {
      headers: {
        "x-api-key": ticksterToken,
        "accept": "application/json",
        "Authorization":  "Basic " + ticksterLogin
      }
    });

    if (response.status === 404) {
      console.log("text " + await response.text())
    }
    const salesData = await response.json();

    Object.assign(event, {sold: salesData.event.sales.ticketCount});
  }

  return filteredEvents;
}
