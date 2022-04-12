const sequelize = {
    transaction: () => {
        return {
            commit: () => null,
            rollback: () => null,
        }
    },
}

module.exports = { sequelize }
