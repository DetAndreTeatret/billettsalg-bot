import { Client, Events, GatewayIntentBits } from 'discord.js'
import { buildEmbeddedMessage } from './embedTickets.js'

const token = process.env.BOT_TOKEN
const guildID = process.env.GUILD_ID
const channelID = process.env.CHANNEL_ID

export async function postEventsToDiscord(eventList) {
  // Create a new client instance
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  })

  // When the client is ready, run this code (only once)
  // We use 'c' for the event parameter to keep it separate
  //from the already defined 'client'
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
  })

  // Log in to Discord with your client's token
  client.login(token)

  //Get channel ID for "billettsalg"s
  let guild = await client.guilds.fetch(guildID)
  //channels = channels.map((c) => c.type === 'GUILD_TEXT'
  let channel = await guild.channels.fetch(channelID)
  let messages = await channel.messages.fetch()

  let botMessage = await messages.find(
    (message) => message.author.username === 'Billettsalg'
  )

  // If embedded message exists, delete it first
  if (botMessage != undefined) {
    console.log('editing message')
    //console.log(botMessage)
    await botMessage.edit({
      embeds: [buildEmbeddedMessage(eventList)],
    })
  } else {
    // Send new updated message
    await channel.send({
      embeds: [buildEmbeddedMessage(eventList)],
    })
  }

  console.log('sending message')
}
