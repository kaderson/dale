const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'utente',
    {
        id_utente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        nome: {
            type: Sequelize.STRING
        },
        cognome: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);