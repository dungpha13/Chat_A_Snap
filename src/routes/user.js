import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verifyToken.js'

const router = express.Router()

//checkUser
router.get('/api/checkUser/:id', verifyToken, verifyUser, (req, res) => {
    res.json("You are user!")
})

//checkAdmin
router.get('/api/checkAdmin/:id', verifyToken, (req, res) => {
    console.log(req.user.id);
    console.log(req.params.id);
    console.log(req.user.id === parseInt(req.params.id))
    res.json("You are admin!")
})

//update
router.put('/api/update/:id', verifyToken, verifyUser, updateUser)

//delete
router.delete('/api/delete/:id', verifyToken, verifyUser, deleteUser)

//get user by id
router.get('/api/get/:id', verifyToken, verifyUser, getUser)

//get all users
router.get('/api/get', verifyToken, verifyAdmin, getUsers)


export default router