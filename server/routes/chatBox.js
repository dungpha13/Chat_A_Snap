import express from 'express'
import { joinABox, deleteChatBox, getAllMembersInBox, getAllMembers, updateChatBox } from '../controllers/chatBox.js'

const router = express.Router()

//create
router.post('/api/join', joinABox)

//update
router.put('/api/update/:id', updateChatBox)

//delete
router.delete('/api/delete/:id', deleteChatBox)

//get all members by boxId
router.get('/api/getMembers/:boxId', getAllMembersInBox)

//get all
router.get('/api/getMembers', getAllMembers)

export default router