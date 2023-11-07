import { DataTypes } from 'sequelize'

import sequelize from '../database/database.js'
import User from './User.js'
import Box from './Box.js'

const tableName = 'message'

const Message = sequelize.define(tableName, {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { tableName: tableName, timestamps: true, updatedAt: false })

User.hasMany(Message, { as: 'Messages', foreignKey: 'userId' })
Message.belongsTo(User, { as: 'Author', foreignKey: 'userId' })

Box.hasMany(Message, { as: 'Messages', foreignKey: 'boxId' })
Message.belongsTo(Box, { as: 'Box', foreignKey: 'boxId' })

await Message.sync().then(() => {
    console.log(`${tableName} table is Ready!`)
})

export default Message