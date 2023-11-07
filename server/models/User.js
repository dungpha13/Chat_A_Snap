import { DataTypes } from 'sequelize'

import sequelize from '../database/database.js'

const tableName = 'user'

const User = sequelize.define(tableName, {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { tableName: tableName, timestamps: true })

await User.sync().then(() => {
    console.log(`${tableName} table is Ready!`)
})

export default User