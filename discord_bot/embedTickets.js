import { EmbedBuilder } from "discord.js"
import {
  capitalizeFirstLetter,
  getWeek,
} from "../date_utils/parseDate.js"

export function buildEmbeddedMessage(eventList) {
  const now = new Date()
  const currentDate = now.toLocaleDateString("no-NO")
  const currentTime = now.toLocaleTimeString("no-NO")

  const ticketSaleMsg = new EmbedBuilder()
    .setColor("#872c99")
    .setDescription("Oppdatert " + currentDate + " kl. " + currentTime)
    .setTitle("Billettsalg uke " + getWeek(eventList[0].date))
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
    const dateMonth = eventDateObj.getMonth().toString()

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

  ticketSaleMsg.setFooter({ text: "\u200B\n Totalt solgt: " + totalSold })

  return ticketSaleMsg
}
