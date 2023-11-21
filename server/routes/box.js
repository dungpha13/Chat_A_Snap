import express from 'express'
import { createBox, deleteBox, getBox, getBoxByUser, getBoxes, getMessageInBox, getUserInBox, joinBox, updateBox } from '../controllers/box.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

//create
router.post('/api/create', createBox)

//update
router.put('/api/update/:id', updateBox)

//delete
router.delete('/api/delete/:id', deleteBox)

//get by id
router.get('/api/getBox/:id', getBox)

//get all
router.get('/api/getBoxes', getBoxes)

//join a box
router.post('/api/joinBox', joinBox)

//get all user in box
router.get('/api/getUserInBox/:id', getUserInBox)

//get all message in box
router.get('/api/getMessageInBox/:id', getMessageInBox)

//get box by user
router.get('/api/getBoxByUser', verifyToken, getBoxByUser)

export default router