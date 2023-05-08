import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// DEPENDENCIES
import DBConnectionManager from '@shared/database/services/DBConnectionManager.js'
// ROUTES IMPORT
import { Routes } from '@/routes/index.js'
// TYPES
import { MongooseConnectionStatus } from '@/types/Mongoose.type.js'

// SERVER
dotenv.config()
const app: Express = express()
const port = process.env.PORT || 3000

// MIDDLEWARE
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use('/', Routes())

// DATABASE CONNECTION
const dbConnectionManager = DBConnectionManager.getInstance()
dbConnectionManager.connect()

// LISTENER DATABASE CONNECTION
setInterval(() => {
  if (dbConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
    dbConnectionManager.connect()
  } else {
    if (dbConnectionManager.statusConnection !== MongooseConnectionStatus[1]) {
      console.log('Database status...' + dbConnectionManager.statusConnection)
    }
  }
}, 10000)

app.listen(port, () => {
  console.log(`[server⚡️]: Server is running on port: ${port}`)
  console.log(`[server⚡️]: Server enviroment: ${process.env.NODE_ENV}`)
})