import { DataTypes } from 'sequelize'

import sequelize from '../database/database.js'
import User from './User.js'
import Box from './Box.js'

const tableName = 'chat_box'

const ChatBox = sequelize.define(tableName, {
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { tableName: tableName, timestamps: false })

User.belongsToMany(Box, { as: 'Boxes', through: ChatBox, foreignKey: 'userId' });
Box.belongsToMany(User, { as: 'Members', through: ChatBox, foreignKey: 'boxId' });

await ChatBox.sync().then(() => {
    console.log(`${tableName} table is Ready!`)
})

export default ChatBox