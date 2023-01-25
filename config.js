import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

if (!process.env.EMAIL) {
  throw new Error('ENV variables not set')
}
