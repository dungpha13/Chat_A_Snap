import { DataTypes } from 'sequelize'

// import SQLModel from '../common/SQLModel.js'
import sequelize from '../database/database.js'

const tableName = 'users'

const Users = sequelize.define(tableName, {
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
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { timestamp: true })

await Users.sync().then(() => {
    console.log(`${tableName} table is Ready!`)
})

export default Users