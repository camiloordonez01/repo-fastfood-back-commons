const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    dialectOptions: { decimalNumbers: true, supportBigNumbers: true },
    hooks: {
        beforeConnect: async (config) => {
            const newConfig = config

            const { HOST_DB, PORT_DB, USER_DB, PASSWORD_DB, SCHEMA_DB } = process.env

            newConfig.host = HOST_DB
            newConfig.post = PORT_DB
            newConfig.username = USER_DB
            newConfig.password = PASSWORD_DB
            newConfig.database = SCHEMA_DB
        },
    },
})

module.exports = { sequelize }
