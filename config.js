import dotenv from "dotenv"

const _dirname = new URL(".", import.meta.url).pathname
dotenv.config({ path: _dirname + ".env" })

if (!process.env.BOT_TOKEN || !process.env.API_TOKEN) {
  throw new Error("ENV variables not set")
}
