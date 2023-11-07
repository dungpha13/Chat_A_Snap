import { DataTypes } from 'sequelize'

import sequelize from '../database/database.js'
import User from './User.js'

const tableName = 'box'

const Box = sequelize.define(tableName, {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { tableName: tableName, timestamps: true })

User.hasMany(Box, { as: 'Products', foreignKey: 'createdBy' })
Box.belongsTo(User, { as: 'Creator', foreignKey: 'createdBy' })

await Box.sync().then(() => {
    console.log(`${tableName} table is Ready!`)
})

export default Box