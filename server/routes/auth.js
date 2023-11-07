import express from 'express'
import { login, register } from '../controllers/auth.js'

const router = express.Router()

//register
router.post('/api/register', register)

//login
router.post('/api/login', login)

export default router