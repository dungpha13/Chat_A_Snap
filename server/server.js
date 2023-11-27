import express from 'express'
import 'dotenv/config.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import boxRouter from './routes/box.js'
import chatBoxRouter from './routes/chatBox.js'
import messageRouter from './routes/message.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import { initSocket } from './socket.js'

// ===== Config =====
const app = express()
const PORT = process.env.PORT || 3001

// ===== Middlewares =====
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ===== Routes =====
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/box', boxRouter)
app.use('/message', messageRouter)
app.use('/chatBox', chatBoxRouter)

// ===== HandleError ====
app.use(errorHandler)

// ===== Server =====
const server = app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})

initSocket(server)
