import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

// SERVER
const app: Express = express()
const port = process.env.PORT || 3000

// MIDDLEWARE
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server⚡️]: Server is running on port: ${port}`)
  console.log(`[server⚡️]: Server enviroment: ${process.env.NODE_ENV}`)
})