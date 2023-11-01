import express from 'express'
import 'dotenv/config.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3001

// ===== Middlewares =====
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// ===== Routes =====
server.use('/user', userRouter)
server.use('/auth', authRouter)

// ===== HandleError ====
server.use(errorHandler)

// ===== Server =====
server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
