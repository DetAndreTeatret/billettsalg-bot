import * as fs from 'fs'

export function writeToFile(jsonInput) {
  let data = JSON.stringify(jsonInput)
  fs.writeFileSync('eventlist.json', data)
}
