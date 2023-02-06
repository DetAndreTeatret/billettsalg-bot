import { EmbedBuilder } from 'discord.js'
import {
  thisWeek,
  convertToDateObj,
  capitalizeFirstLetter,
} from '../scraper/parseDate.js'

export function buildEmbeddedMessage(eventList) {
  let ticketSaleMsg = new EmbedBuilder()
    .setColor('#872c99')
    .setDescription('\u200B\n ')
    .setTitle('Billettsalg uke ' + thisWeek())
    .setThumbnail(
      'https://www.detandreteatret.no/uploads/assets/images/Stemning/_800x800_crop_center-center_82_none/andre-teatret-logo.png?mtime=1583149819'
    )
    .addFields()

  let totalSold = 0

  eventList.forEach((event) => {
    totalSold = totalSold + Number(event.sold)
    let eventDateObj = convertToDateObj(event.date)
    let dateName = eventDateObj.toLocaleDateString('no-NO', { weekday: 'long' })

    ticketSaleMsg.addFields({
      value: event.sold,
      name:
        capitalizeFirstLetter(dateName).slice(0, -3) +
        ' ' +
        event.date.slice(0, -5) +
        '   -   ' +
        event.name,
    })
  })

  ticketSaleMsg.setFooter({ text: '\u200B\n Totalt solgt: ' + totalSold })

  return ticketSaleMsg
}

export let testEmbed = new EmbedBuilder().setTitle('funker dette?').addFields({
  name: 'test',
  value: 'testvalue',
})
