const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'candidati',
    {
        id_candidato: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING
	    },
        cognome: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        cell: {
            type: Sequelize.STRING
        },
        contattato: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);