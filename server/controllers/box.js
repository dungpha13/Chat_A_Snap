import { createError } from "../common/error.js"
import User from "../models/User.js";
import Box from "../models/Box.js";
import Message from "../models/Message.js";
import { Op } from "sequelize";

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
        .then((result) => {
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

//get message in box
export const getMessageInBox = async (req, res, next) => {
    await Box.findOne({
        where: req.params
        , include: [{
            model: Message,
            as: 'Messages',
            // order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                as: 'Author',
                attributes: { exclude: ['username', 'password'] },
            }]
            // through: {
            //     attributes: [],
            //     where: { isAdmin: false }
            // }
        }]
    })
        .then((result) => {
            console.log(result);
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

//get all box user have join
export const getBoxByUser = async (req, res, next) => {
    await Box.findAll({
        include: [
            {
                model: User,
                as: 'Members',
                attributes: { exclude: ['username', 'password'] },
                where: { id: req.user.id },
                through: {
                    attributes: [],
                },
            },
            {
                model: Message,
                as: 'Messages',
                include: [{
                    model: User,
                    as: 'Author',
                    attributes: { exclude: ['username', 'password'] },
                    // through: {
                    //     attributes: [],
                    // },
                }]
            }
        ]
    })
        .then(async (result) => {
            if (!result.length) {
                next(createError(404, "Box not found!"))
            } else {
                const results = await Promise.all(result.map(async (box) => {
                    const allMembers = await box.getMembers({
                        attributes: {
                            exclude: ['username', 'password'],
                        },

                        // where: {
                        //     id: 2
                        // }
                    });
                    const result = { ...box.dataValues, allMembers };
                    return result;
                }));
                res.status(200).json({
                    status: 200,
                    message: "ok",
                    data: results
                })
            }
        }).catch((err) => {
            next(err)
        });
}

//access chat
export const accessChat = async (req, res, next) => {
    await Box.findAll({
        where: {
            isGroupChat: false,
        },
        include: [{
            model: User,
            as: 'Members',
            attributes: { exclude: ['username', 'password'] },
            where: { id: req.user.id },
            through: {
                attributes: [],
            },
        }, {
            model: Message,
            as: 'Messages',
            include: [{
                model: User,
                as: 'Author',
                attributes: { exclude: ['username', 'password'] },
            }]
        }]
    })
        .then(async (result) => {
            if (result.length > 0) {
                const sender = await User.findOne({
                    where: {
                        id: req.body.userId
                    }
                })
                if (!sender) {
                    next(404, "User not found!")
                } else {
                    const boxes = await Promise.all(result.map(async (box) => {
                        const isSender = await box.hasMembers(sender);
                        return { box, isSender };
                    }));

                    const filteredBoxes = boxes.filter(({ isSender }) => isSender === true).map(({ box }) => box);
                    console.log(filteredBoxes);
                    if (filteredBoxes.length > 0) {
                        const allMembers = await filteredBoxes[0].getMembers({
                            attributes: {
                                exclude: ['username', 'password'],
                            },
                        });
                        const resultDTO = { ...filteredBoxes[0].dataValues, allMembers };
                        res.status(200).json({
                            status: 200,
                            message: "ok",
                            data: resultDTO
                        })
                    } else {
                        await User.findAll({
                            where: {
                                id: [req.user.id, req.body.userId]
                            }
                        })
                            .then(async (users) => {
                                if (users.length >= 2) {
                                    var chatData = {
                                        boxName: "sender",
                                        description: "single chat",
                                        isGroupChat: false,
                                    };
                                    await Box.create(chatData)
                                        .then(async (box) => {
                                            if (box) {
                                                await Promise.all(users.map(async (user) => {
                                                    if (user.id === req.user.id) {
                                                        await box.setCreator(user);
                                                    }
                                                    await box.addMembers(user, { through: { isAdmin: true } });
                                                }))
                                                    .then(async (result) => {
                                                        if (result) {
                                                            await box.getMembers({
                                                                attributes: {
                                                                    exclude: ['username', 'password'],
                                                                },
                                                            }).then(async (allMembers) => {
                                                                if (allMembers) {
                                                                    await box.getMessages()
                                                                        .then((Messages) => {
                                                                            const resultDTO = { ...box.dataValues, allMembers, Messages };
                                                                            res.status(200).json({
                                                                                status: 200,
                                                                                message: "ok",
                                                                                data: resultDTO
                                                                            })
                                                                        }).catch((err) => {
                                                                            next(err)
                                                                        });
                                                                }
                                                            }).catch((err) => {
                                                                next(err)
                                                            });
                                                        }
                                                    }).catch((err) => {
                                                        next(err)
                                                    });
                                            } else {
                                                next(createError(404, "Box create fail"))
                                            }
                                        }).catch((err) => {
                                            next(err)
                                        });
                                } else {
                                    next(createError(404, "User don't exist"))
                                }
                            }).catch((err) => {
                                next(err)
                            });
                    }
                }
            } else {
                await User.findAll({
                    where: {
                        id: [req.user.id, req.body.userId]
                    }
                })
                    .then(async (users) => {
                        // console.log(users);
                        if (users.length >= 2) {
                            var chatData = {
                                boxName: "sender",
                                description: "single chat",
                                isGroupChat: false,
                            };
                            await Box.create(chatData)
                                .then(async (box) => {
                                    if (box) {
                                        users.map(async (user) => {
                                            if (user.id === req.user.id) {
                                                await box.setCreator(user)
                                            }
                                            await box.addMembers(user, { through: { isAdmin: true } })
                                        });
                                        const allMembers = await box.getMembers({
                                            attributes: {
                                                exclude: ['username', 'password'],
                                            },
                                        });
                                        const resultDTO = { ...box.dataValues, allMembers };
                                        res.status(200).json({
                                            status: 200,
                                            message: "ok",
                                            data: resultDTO
                                        })
                                    }
                                    else {
                                        next(createError(404, "Box create fail"))
                                    }
                                }).catch((err) => {
                                    next(err)
                                });
                        } else {
                            next(createError(404, "User don't exist"))
                        }
                    }).catch((err) => {
                        next(err)
                    });
            }
        }).catch((err) => {
            next(err)
        });
}

//create group chat
export const createGroupChat = async (req, res, next) => {
    var members = JSON.parse(req.body.members)
    if (members.length < 2) {
        next(createError(400, "More than 2 users are required to form a group chat"))
    } else {
        members.push(req.user.id)
        await User.findAll({
            where: { id: members }
        })
            .then(async (members) => {
                if (members.length > 0) {
                    await Box.create({
                        boxName: req.body.boxName,
                        description: "group chat",
                        isGroupChat: true
                    })
                        .then(async (box) => {
                            if (box) {
                                await Promise.all(members.map(async (user) => {
                                    if (user.id === req.user.id) {
                                        await box.setCreator(user);
                                        await box.addMembers(user, { through: { isAdmin: true } });
                                    }
                                    await box.addMembers(user);
                                }))
                                    .then(async (result) => {
                                        if (result) {
                                            await box.getMembers({
                                                attributes: {
                                                    exclude: ['username', 'password'],
                                                },
                                            }).then(async (allMembers) => {
                                                if (allMembers) {
                                                    await box.getMessages()
                                                        .then((Messages) => {
                                                            const resultDTO = { ...box.dataValues, allMembers, Messages };
                                                            res.status(200).json({
                                                                status: 200,
                                                                message: "ok",
                                                                data: resultDTO
                                                            })
                                                        }).catch((err) => {
                                                            next(err)
                                                        });
                                                }
                                            }).catch((err) => {
                                                next(err)
                                            });
                                        }
                                    }).catch((err) => {
                                        next(err)
                                    });
                            } else {
                                next(createError(404, "Box create fail"))
                            }
                        }).catch((err) => {
                            next(err)
                        });
                } else {
                    next(404, "User not found")
                }
            }).catch((err) => {
                next(err)
            });
    }
}

