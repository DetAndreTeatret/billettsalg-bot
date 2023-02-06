import { Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js'
import { buildEmbeddedMessage } from './embedTickets.js'

const token = process.env.BOT_TOKEN
const guildID = '1069389599400525834'
const channelID = '1069389703230529607'

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
    console.log('message exists')
    //console.log(botMessage)
    await botMessage.delete()
  }

  console.log('sending message')
  // Send new updated message
  await channel.send({
    embeds: [buildEmbeddedMessage(eventList)],
  })
}
