import express from 'express'
import { deleteUser, getUser, getUserByNameOrEmail, getUsers, updateUser } from '../controllers/user.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

//checkUser
router.get('/api/checkUser/:id', verifyToken, (req, res) => {
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
router.put('/api/update/:id', updateUser)

//delete
router.delete('/api/delete/:id', deleteUser)

//get user by id
router.get('/api/get/:id', getUser)

//get all users
router.get('/api/get', getUsers)

//get user by name or email
router.get('/api/getByNameOrEmail', verifyToken, getUserByNameOrEmail)

export default router