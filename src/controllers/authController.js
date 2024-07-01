import { connectionMongo, closeConnectionMongo } from "../database/mongoDB";
import userSchema from "../models/userSchema";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'


const encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const validatePass = async (userPassword, password) => {
  return await bcrypt.compare(password, userPassword)
}

const generationJWT = async (infoUser) => {
  const token = await jwt.sign({
    exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24,
    infoUser,
  }, process.env.JWT_SECRET_KEY)
  return token
}

export const register_controller = async (req, res) => {
  const { first_name, last_name, username, password, birthday, phone, email } = req.body

  const userStructure = userSchema({
    username,
    password: await encryptPass(password),
    email,
    phone,
    personal_data: {
      first_name,
      last_name,
      birthday,
      pic_profile: null
    }
  })

  await userSchema
    .findOne({ username })
    .then((data) => {
      if (data === null) {
        userStructure
          .save()
          .then(() => {
            res.status(201).json({
              message: 'register_status: OK',
              status: true
            })
          })
          .catch((err) => {
            res.status(500).json({
              message: 'register_status: ERROR_SAVE',
              status: false,
              err
            })
          })
      } else {
        res.status(302).json({
          message: 'register_status: USER_REGISTERED',
          status: false
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'register_status: CATCH_ERROR',
        status: false,
        err
      })
    })
}

export const login_controller = async (req, res) => {
  const { username, password } = req.body
  await userSchema
    .findOne({ username })
    .then(async data => {
      if (!data) {
        res.status(401).json({
          message: 'Usuario no encontrado     ',
          status: false
        })
      } else {
        const validation = await validatePass(data.password, password)
        console.log(validation)

        if (!validation) {
          res.status(401).json({
            message: 'Contraseña no valida',
            status: false
          })
        } else {
          const infoUser = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            phone: data.phone
          }

          const token = await generationJWT(infoUser)
          res.status(302).json({
            message: 'Usuario validado',
            token,
            status: true
          })
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error en el servidor',
        Error: err,
        status: false
      })
    })


}