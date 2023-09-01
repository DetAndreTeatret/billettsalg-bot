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

  return monday
}

export function sundayThisWeek() {
  let today = new Date()
  let sunday = new Date()
  let sundayNumMonth = today.getDate() - today.getDay() + 7
  sunday.setDate(sundayNumMonth)

  return sunday
}

export function getWeek(inputDate) {
  let d = inputDate
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return weekNo
}

export function filterDates(eventList, startDate, endDate) {
  return eventList.filter(
    (event) =>
      event.date.getTime() >= startDate.getTime() &&
      event.date.getTime() <= endDate.getTime()
  )
}

export function dateToString(dateObj) {
  // Get year, month, and day part from the date
  var year = dateObj.toLocaleString('default', { year: 'numeric' })
  var month = dateObj.toLocaleString('default', { month: '2-digit' })
  var day = dateObj.toLocaleString('default', { day: '2-digit' })

  // Generate yyyy-mm-dd date string
  var formattedDateString = year + '-' + month + '-' + day
  return formattedDateString
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
