import mongoose from 'mongoose'
import 'dotenv/config'

export const connectionMongo = async () => {
  return await mongoose
  .connect(process.env.URL_LOCAL_DB)
  .then(() => {
    console.log('DB_status: mongoOnline')
  })
  .catch((err) => {
    console.log(err)
  })
}

export const closeConectionMongo = async() => {
  return await mongoose
  .disconnect()
  .then(() => {
    console.log('DB_status: mongoOffline')
  })
  .catch((err) => {
    console.log(err)
  })
}