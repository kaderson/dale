const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'candidati_skills',
    {
        id_candskill: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_candidato: {
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