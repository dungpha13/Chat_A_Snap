import { createError } from "../common/error.js"
import { DataResponse } from "../common/response.js"
import Users from "../models/Users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//register
export const register = async (req, res, next) => {
    const { email, fullName, username, password } = req.body
    try {
        let newUser = await Users.findOne({
            where: {
                username: username
            }
        })
        if (newUser) {
            return next(createError(500, "User already exist!"))
        }
        const hash = bcrypt.hashSync(password, 13)
        newUser = await Users.create({
            email,
            fullName,
            username,
            password: hash
        })
        return res.status(201).json({
            status: 201,
            message: "Register successfully",
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}

//login
export const login = async (req, res, next) => {
    // const { username, password } = req.body
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(401, "UserName Or Password incorrect!"))
        }
        const payload = {
            id: user.id,
            isAdmin: user.isAdmin
        }
        const { username, password, isAdmin, ...otherDetails } = user.dataValues
        const token = jwt.sign(payload, process.env.SECRET)
        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({
            status: 200,
            message: "Login successfully",
            data: otherDetails
        })
    } catch (error) {
        next(error)
    }
}