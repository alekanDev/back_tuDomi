import express from 'express'
import { login_controller, register_controller } from '../controllers/authController'

export const auth_routes = express.Router()

auth_routes.post('/register', register_controller)
auth_routes.post('/login', login_controller)
// auth_routes.post('/logout', logout_controller)