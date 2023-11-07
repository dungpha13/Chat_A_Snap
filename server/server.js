import express from 'express'
import 'dotenv/config.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import boxRouter from './routes/box.js'
import messageRouter from './routes/message.js'
import chatBoxRouter from './routes/chatBox.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3001

// ===== Middlewares =====
server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// ===== Routes =====
server.use('/user', userRouter)
server.use('/auth', authRouter)
server.use('/box', boxRouter)
server.use('/message', messageRouter)
server.use('/chatBox', chatBoxRouter)

// ===== HandleError ====
server.use(errorHandler)

// ===== Server =====
server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
