const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'ricerche_skills',
    {
        id_ricskill: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_ricerca: {
            type: Sequelize.INTEGER
        },
        id_skill: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);