import { EmbedBuilder } from "discord.js"
import {
  capitalizeFirstLetter,
  getWeek,
} from "../date_utils/parseDate.js"

const coolFaces = ["(♥_♥)", "ˁ˚ᴥ˚ˀ", "~(‾▿‾)~", "(╭ರ_•́)", "( ͡° ͜ʖ ͡°)", "(>.<)", "ʕ⌐■ᴥ■ʔ"]

export function buildEmbeddedMessage(eventList) {
  const now = new Date()
  const currentDate = now.toLocaleDateString("no-NO")
  const currentTime = now.toLocaleTimeString("no-NO")


  let title = "Ingen forestillinger denne uken! (Uke " + getWeek(now) + ") "
  if (eventList.length > 0) title = "Billettsalg uke " + getWeek(eventList[0].date)

  const ticketSaleMsg = new EmbedBuilder()
    .setColor("#872c99")
    .setDescription("Oppdatert " + currentDate + " kl. " + currentTime)
    .setTitle(title)
    .setThumbnail(
      "https://www.detandreteatret.no/uploads/assets/images/Stemning/_800x800_crop_center-center_82_none/andre-teatret-logo.png?mtime=1583149819"
    )
    .addFields({
      name: "\u200B\n ",
      value: " ",
    })

  let totalSold = 0

  eventList.forEach((event) => {
    totalSold = totalSold + Number(event.sold)
    const eventDateObj = event.date

    const dateName = eventDateObj.toLocaleDateString("no-NO", { weekday: "long" })
    const dateDay = eventDateObj.getDate().toString()
    // Months are zero indexed, so we add one before we display
    const dateMonth = (eventDateObj.getMonth() + 1).toString()

    ticketSaleMsg.addFields({
      value: event.sold.toString(),
      name:
        capitalizeFirstLetter(dateName).slice(0, -3) +
        " " +
        dateDay +
        "." +
        dateMonth +
        "   -   " +
        event.name,
    })
  })

  if (eventList.length === 0) {
    ticketSaleMsg.addFields({
      name: "Det kommer vel forestillinger snart?",
      value: coolFaces[Math.floor(Math.random() * coolFaces.length)]
    })
  }

  if (totalSold > 0) ticketSaleMsg.setFooter({ text: "\u200B\n Totalt solgt: " + totalSold })
  else ticketSaleMsg.setFooter({ text: "\u200B\n Ingen billetter å selge..."})

  return ticketSaleMsg
}
