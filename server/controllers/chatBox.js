import ChatBox from "../models/ChatBox.js";
import { createError } from "../common/error.js"
import { DataResponse } from "../common/response.js"
import User from "../models/User.js";
import Box from "../models/Box.js";

//create ChatBox
export const joinABox = async (req, res, next) => {
    const { userId, boxId } = req.body
    await User.findOne({ where: { id: userId } })
        .then(async (user) => {
            if (user) {
                await Box.findOne({ where: { id: boxId } })
                    .then(async (box) => {
                        if (box) {
                            await ChatBox.findOne({ Where: { userId, boxId } })
                                .then(async (result) => {
                                    if (result) {
                                        next(createError(400, "You already join this box!"))
                                    } else {
                                        await ChatBox.create({
                                            userId,
                                            boxId,
                                            isAdmin: false
                                        })
                                    }
                                }).catch((err) => {
                                    next(createError(err))
                                });
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

//update ChatBox
export const updateChatBox = async (req, res, next) => {

}

//delete ChatBox
export const deleteChatBox = async (req, res, next) => {

}

//get all members in box by boxId
export const getAllMembersInBox = async (req, res, next) => {
    await ChatBox.findAll({ where: req.params })
        .then((result) => {
            res.status(200).json({
                status: 200,
                message: "ok",
                data: result
            })
        }).catch((err) => {
            next(err)
        });
}

//get all Members
export const getAllMembers = async (req, res, next) => {
    await ChatBox.findAll()
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

