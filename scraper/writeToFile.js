import * as fs from "fs"

export function writeToFile(jsonInput) {
  const data = JSON.stringify(jsonInput)
  fs.writeFileSync("eventlist.json", data)
}
