const { DataTypes } = require('sequelize')
const { sequelize } = require('../infrastructure/database')

const modelColumnDefault = {
    activeRow: {
        type: DataTypes.ENUM,
        field: 'active_row',
        values: ['0', '1'],
        defaultValue: '1',
        allowNull: false,
    },
    createdAt: {
        type: 'TIMESTAMP',
        field: 'created_at',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    updatedAt: {
        type: 'TIMESTAMP',
        field: 'updated_at',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
}

const columnIdDefault = (column) => ({
    type: DataTypes.INTEGER,
    field: column,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
})

const columnUserUid = {
    type: DataTypes.STRING(100),
    field: 'user_uid',
    allowNull: false,
}

module.exports = {
    modelColumnDefault,
    columnIdDefault,
    columnUserUid,
}
