import { where } from "sequelize";
import { createError } from "../common/error.js"
import { DataResponse } from "../common/response.js"
import Users from "../models/Users.js"

//update user
export const updateUser = async (req, res, next) => {
    await Users.update(req.body, { where: req.params })
        // console.log(user);
        .then((result) => {
            if (result[0] === 0) {
                return next(createError(404, "User not found!"))
            }
            res.status(200).json({
                status: 200,
                message: "Update successfully",
                data: ""
            })
        }).catch((err) => {
            next(err)
        });
    // Users.findOne({ where: req.params })
    //     .then(record => {
    //         if (record) {
    //             // Update the record here
    //             record.update()
    //                 .then(updatedRecord => {
    //                     res.status(201).json({
    //                         status: 200,
    //                         message: "Update successfully",
    //                         data: updatedRecord
    //                     })
    //                 })
    //                 .catch(error => {
    //                     next(error)
    //                 })
    //         } else {
    //             return next(createError(404, "User not found!"))
    //         }
    //     })
    //     .catch(error => {
    //         next(error)
    //     })
}

//delete user
export const deleteUser = async (req, res, next) => {
    await Users.destroy({ where: req.params })
        .then(() => {
            res.status(200).json({
                status: 200,
                message: "Delete successfully",
                data: ""
            })
        }).catch((err) => {
            next(err)
        });
}

//get user by id
export const getUser = async (req, res, next) => {
    await Users.findOne({ where: req.params })
        .then((result) => {
            if (!result) {
                return next(createError(404, "User not found!"))
            }
            const { username, password, isAdmin, ...otherDetails } = result.dataValues
            res.status(200).json({
                status: 200,
                message: "found",
                data: otherDetails
            })
        }).catch((err) => {
            next(err)
        });
}

//get all user
export const getUsers = async (req, res, next) => {
    await Users.findAll()
        .then((result) => {
            if (!result.length) {
                return next(createError(404, "User not found!"))
            }
            res.status(200).json({
                status: 200,
                message: "found",
                data: result
            })
        }).catch((err) => {
            next(err)
        });
}
