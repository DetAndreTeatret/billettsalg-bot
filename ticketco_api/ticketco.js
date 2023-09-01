// API URL
const ticketco_endpoint = 'https://ticketco.events:443/api/public/v1/events?'

// .env constants
const ticketcoToken = process.env.API_TOKEN

export async function getEventsTicketCo() {
  let requestURL =
    ticketco_endpoint + 'token=' + ticketcoToken + '&status=active'
  /*
    '&start_at=' +
    startDate +
    '&end_at=' +
    endDate
    */

  const response = await fetch(requestURL)
  console.log('Requesting data from TicketCo API')
  const eventData = await response.json()

  const filteredEvents = eventData.events.map((event) => ({
    id: event.id,
    name: event.title,
    date: new Date(event.start_at),
    sold: event.total_sold,
  }))

  console.log('Data received')
  return filteredEvents
}
