import Sequelize from 'sequelize'
import "dotenv/config.js"

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  port: process.env.MYSQL_PORT,
  logging: false,
  charset: "utf8mb4",
  collate: "utf8mb4_unicode_ci",
  pool: {
    max: 100,
    min: 0,
    acquire: 1000000,
    idle: 100000,
    evict: 2000,
  },
  dialectOptions: {
    decimalNumbers: true,
  },
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((error) => {
  console.error('Unable to connect to the database: ', error)
})

export default sequelize