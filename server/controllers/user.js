import { createError } from "../common/error.js"
import User from "../models/User.js"
import { Op } from "sequelize"

//update user
export const updateUser = async (req, res, next) => {
    await User.update(req.body, { where: req.params })
        .then((result) => {
            if (result[0] === 0) {
                return next(createError(404, "Update failed!"))
            }
            res.status(200).json({
                status: 200,
                message: "Update successfully",
            })
        }).catch((err) => {
            next(err)
        })
}

//delete user
export const deleteUser = async (req, res, next) => {
    await User.destroy({ where: req.params })
        .then(() => {
            res.status(200).json({
                status: 200,
                message: "Delete successfully",
            })
        }).catch((err) => {
            next(err)
        });
}

//get user by id
export const getUser = async (req, res, next) => {
    await User.findOne({ where: req.params })
        .then((result) => {
            if (!result) {
                next(createError(404, "User not found!"))
            } else {
                const { username, password, ...otherDetails } = result.dataValues
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: otherDetails
                })
            }
        }).catch((err) => {
            next(err)
        });
}

//get all user
export const getUsers = async (req, res, next) => {
    await User.findAll()
        .then((result) => {
            if (!result.length) {
                next(createError(404, "User not found!"))
            } else {
                const resultDTO = result.map((element) => {
                    const { username, password, ...otherDetails } = element.dataValues
                    return otherDetails
                })
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: resultDTO
                })
            }
        }).catch((err) => {
            next(err)
        });
}

//get user by name or email
export const getUserByNameOrEmail = async (req, res, next) => {
    await User.findAll({
        where: {
            [Op.or]: [
                {
                    fullName: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                {
                    email: {
                        [Op.like]: `%${req.query.search}%`
                    }
                }
            ],
            [Op.not]: [
                { id: req.user.id }
            ]
        }
    })
        .then((result) => {
            if (!result.length) {
                next(createError(404, "User not found!"))
            } else {
                const resultDTO = result.map((element) => {
                    const { username, password, ...otherDetails } = element.dataValues
                    return otherDetails
                })
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: resultDTO
                })
            }
        }).catch((err) => {
            next(err)
        });
}
