import express from 'express'
import { accessChat, addUser, createBox, createGroupChat, deleteBox, getAdminGroup, getBox, getBoxByUser, getBoxes, getMessageInBox, joinBox, removeUser, renameGroup, updateBox } from '../controllers/box.js'
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
router.get('/api/getAdmin/:id', getAdminGroup)

//get all message in box
router.get('/api/getMessageInBox/:id', getMessageInBox)

//get box by user
router.get('/api/getBoxByUser', verifyToken, getBoxByUser)

//access chat
router.post('/api/accessChat', verifyToken, accessChat)

//create group chat
router.post('/api/createGroup', verifyToken, createGroupChat)

//remove member
router.put('/api/removeMember', verifyToken, removeUser)

//add member
router.put('/api/addMember', verifyToken, addUser)

//rename group
router.put('/api/renameGroup', verifyToken, renameGroup)

export default router