export function convertToDateObj(dateString) {
  let parts = dateString.split('.')
  const offset = 2 //Offset to compensate for timezone and summer time offset
  return new Date(parts[2], parts[1] - 1, parts[0], offset)
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

export function filterDates(eventList, startDate, endDate) {
  return eventList.filter(
    (event) => event['dateObj'] >= startDate && event['dateObj'] <= endDate
  )
}

let eventListTest = [
  { date: '01.01.2023', name: 'Frost 2', sold: '6' },
  { date: '04.01.2023', name: 'Nemo 3', sold: '41' },
  { date: '06.01.2023', name: 'Nemo 5', sold: '10' },
  { date: '23.01.2023', name: 'Nemo 7', sold: '20' },
  { date: '25.01.2023', name: 'Nemo 8', sold: '15' },
  { date: '27.01.2023', name: 'Nemo 9', sold: '45' },
]

///// For testing purposes only

// convert datestrings to javascript Date objects
// eventListTest.forEach((event) => {
//   event['date'] = convertToDate(event['date'])
// })

// console.log(filterDates(eventListTest, mondayThisWeek(), sundayThisWeek()))
