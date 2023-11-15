import Box from "../models/Box.js";
import { createError } from "../common/error.js"
import User from "../models/User.js";
import ChatBox from "../models/ChatBox.js";

//create box
export const createBox = async (req, res, next) => {
    const { userId, ...otherDetails } = req.body
    await User.findOne({ where: { id: userId } })
        .then(async (user) => {
            if (user) {
                await Box.create(otherDetails)
                    .then(async (box) => {
                        await box.setCreator(user)
                        await box.addMembers(user, { through: { isAdmin: true } })
                        res.status(201).json({
                            status: 201,
                            message: "Create successfully",
                        })
                    }).catch((err) => {
                        next(err)
                    });
            } else {
                next(createError(404, "User not found!"))
            }
        }).catch((err) => {
            next(err)
        });
}

//update box
export const updateBox = async (req, res, next) => {
    await Box.update(req.body, { where: req.params })
        .then((result) => {
            if (result[0] === 0) {
                next(createError(404, "Box not found!"))
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Update successfully!"
                })
            }
        }).catch((err) => {
            next(err)
        });
}

//delete box
export const deleteBox = async (req, res, next) => {
    await Box.destroy({ where: req.params })
        .then(() => {
            res.status(200).json({
                status: 200,
                message: "Delete successfully!"
            })
        }).catch((err) => {
            next(err)
        });
}

//get box by id
export const getBox = async (req, res, next) => {
    await Box.findOne({
        where: req.params
        // , include: [{ model: User, as: 'Creator' }]
    })
        .then(async (result) => {
            if (!result) {
                next(createError(404, "Box not found!"))
            } else {
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: result
                })
            }
        }).catch((err) => {
            next(err)
        });
}

//get all box
export const getBoxes = async (req, res, next) => {
    await Box.findAll()
        .then((result) => {
            if (!result) {
                next(createError(404, "List Box empty!"))
            } else {
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: result
                })
            }
        }).catch((err) => {
            next(err)
        });
}

//join a box
export const joinBox = async (req, res, next) => {
    const { userId, boxId } = req.body
    await User.findOne({ where: { id: userId } })
        .then(async (user) => {
            if (user) {
                await Box.findOne({ where: { id: boxId } })
                    .then(async (box) => {
                        if (box) {
                            const existMember = await box.addMembers(user)
                            if (existMember) {
                                res.status(200).json({
                                    status: 200,
                                    message: "Join Successfull!"
                                })
                            } else {
                                next(createError(400, "You already join this box!"))
                            }
                        } else {
                            next(createError(404, "Box not found!"))
                        }
                    }).catch((err) => {
                        next(err)
                    });
            } else {
                next(createError(404, "User not found!"))
            }
        }).catch((err) => {
            next(err)
        });
}

//get all user in box
export const getUserInBox = async (req, res, next) => {
    await Box.findOne({
        where: req.params
        , include: [{
            model: User,
            as: 'Members',
            attributes: { exclude: ['username', 'password'] },
            through: {
                attributes: [],
                // where: { isAdmin: false }
            }
        }]
    })
        .then(async (result) => {
            // console.log(result);
            if (!result) {
                next(createError(404, "Box not found!"))
            } else {
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: result
                })
            }
        }).catch((err) => {
            next(err)
        });
}



