import express from 'express'
import { createMessage, deleteMessage, getMessages } from '../controllers/message.js'

const router = express.Router()

//create
router.post('/api/create', createMessage)

//update
// router.put('/api/update/:id', updateMessage)

//delete
router.delete('/api/delete/:id', deleteMessage)

//get by id
// router.get('/api/getMessage/:id', getMessage)

//get all
router.get('/api/getMessages', getMessages)

export default router