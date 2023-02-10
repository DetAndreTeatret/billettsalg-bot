export function convertToDateObj(dateString) {
  let parts = dateString.split('.')
  const offset = 2 //Offset to compensate for timezone and summer time offset
  return new Date(parts[2], parts[1] - 1, parts[0], offset)
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function mondayThisWeek() {
  let today = new Date()
  let monday = new Date()
  let mondayNumMonth = today.getDate() - today.getDay() + 1

  monday.setDate(mondayNumMonth)
  //let mondayFormatted = monday.toLocaleDateString("no-NO")
  return monday
}

export function sundayThisWeek() {
  let sunday = new Date()
  let monday = mondayThisWeek()
  sunday.setDate(monday.getDate() + 6)

  return sunday
}

export function thisWeek() {
  let currentDate = new Date()
  let startDate = new Date(currentDate.getFullYear(), 0, 1)
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000))
  let weekNumber = Math.ceil(days / 7)

  return weekNumber
}

export function filterDates(eventList, startDate, endDate) {
  return eventList.filter(
    (event) => event['dateObj'] >= startDate && event['dateObj'] <= endDate
  )
}

///// For testing purposes only

export let eventListTest = [
  { date: '06.02.2023', name: 'Lykke til, Cathrine Frost!', sold: '6' },
  { date: '07.02.2023', name: 'Fredagsfilmen', sold: '41' },
  { date: '08.02.2023', name: 'Instant Broadway', sold: '10' },
  { date: '09.02.2023', name: 'Folka', sold: '20' },
  { date: '10.02.2023', name: 'Steikje Løye', sold: '15' },
  { date: '11.02.2023', name: 'Såvidt en hit', sold: '45' },
]
//console.log(filterDates(eventListTest, mondayThisWeek(), sundayThisWeek()))
//console.log(mondayThisWeek())
