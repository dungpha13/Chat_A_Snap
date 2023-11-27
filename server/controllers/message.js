import Message from "../models/Message.js";
import { createError } from "../common/error.js"
import { DataResponse } from "../common/response.js"
import User from "../models/User.js";
import Box from "../models/Box.js";

//create Message
export const createMessage = async (req, res, next) => {
    const { boxId, content } = req.body
    await User.findOne({ where: { id: req.user.id } })
        .then(async (user) => {
            if (user) {
                await Box.findOne({ where: { id: boxId } })
                    .then(async (box) => {
                        if (box) {
                            if (await box.hasMembers(user)) {
                                await Message.create({
                                    content: content
                                })
                                    .then(async (message) => {
                                        await message.setAuthor(user)
                                        await message.setBox(box)
                                        const Box = await message.getBox({
                                            include: [{
                                                model: User,
                                                as: 'Members',
                                                attributes: {
                                                    exclude: ['username', 'password'],
                                                }
                                            }]
                                        })
                                        const Author = await message.getAuthor({
                                            attributes: {
                                                exclude: ['username', 'password'],
                                            }
                                        })
                                        const result = { ...message.dataValues, Box, Author };
                                        res.status(201).json({
                                            status: 201,
                                            message: "Create successfully",
                                            data: result
                                        })
                                    }).catch((err) => {
                                        next(err)
                                    });
                            } else {
                                next(createError(400, "User not in box!"))
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

//update Message
export const updateMessage = async (req, res, next) => {

}

//delete Message
export const deleteMessage = async (req, res, next) => {
    await Message.destroy({ where: req.params })
        .then(() => {
            res.status(200).json({
                status: 200,
                message: "Delete successfully!"
            })
        }).catch((err) => {
            next(err)
        });
}

//get Message by id
export const getMessage = async (req, res, next) => {

}

//get all Message
export const getMessages = async (req, res, next) => {
    await Message.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                model: Box,
                as: 'Box',
                where: {
                    id: req.params.boxId
                },
                include: [{
                    model: User,
                    as: 'Members',
                    attributes: {
                        exclude: ['username', 'password']
                    }
                }]
            },
            {
                model: User,
                as: 'Author',
                attributes: {
                    exclude: ['username', 'password']
                }
            }
        ]
    })
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

