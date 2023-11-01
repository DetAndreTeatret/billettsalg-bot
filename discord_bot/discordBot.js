import { Client, Events, GatewayIntentBits } from "discord.js"
import { buildEmbeddedMessage } from "./embedTickets.js"

const token = process.env.BOT_TOKEN
const guildID = process.env.GUILD_ID
const channelID = process.env.CHANNEL_ID

export async function postEventsToDiscord(eventList) {
  // Create a new client instance
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  })

  client.once(Events.ClientReady, (c) => {
    console.log(`Discord bot ready! Logged in as ${c.user.tag}`)
  })

  await client.login(token)

  // Get channel ID for "billettsalg"s
  const guild = await client.guilds.fetch(guildID)
  const channel = await guild.channels.fetch(channelID)
  const messages = await channel.messages.fetch()

  const botMessage = await messages.find(
    (message) => message.author.id === client.user.id
  )

  const updatedMessage = buildEmbeddedMessage(eventList)

  // If embedded message exists, delete it first
  if (botMessage !== undefined) {
    console.log("Editing message...")
    await botMessage.edit({
      embeds: [updatedMessage],
    })

    // Remove reactions when displaying new week
    if (botMessage.embeds[0].data.title !== updatedMessage.data.title) {
      console.log("Removing reactions...")
      await botMessage.reactions.removeAll()
    }
  } else {
    // Send new updated message
    await channel.send({
      embeds: [updatedMessage],
    })
  }

  console.log("Sending message...")
}
