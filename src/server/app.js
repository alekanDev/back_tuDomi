import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import { auth_routes } from '../routes/auth_Routes';
import { connectionMongo } from '../database/mongoDB';

const app = express()
const PORT = process.env.PORT

export const serverACTIVE = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
}

connectionMongo()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(auth_routes)

