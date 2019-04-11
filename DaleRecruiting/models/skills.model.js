const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'skills',
    {
        id_skill: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        skill: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);