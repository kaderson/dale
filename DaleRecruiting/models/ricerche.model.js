const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'ricerche',
    {
        id_ricerca: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data_ricerca: {
            type: Sequelize.DATE
        },
        titolo: {
            type: Sequelize.STRING
        },
        descrizione: {
            type: Sequelize.STRING
        },
        descrizione_posizione: {
            type: Sequelize.STRING
        },
        recruiter: {
            type: Sequelize.STRING
        },
        azienda_cliente: {
            type: Sequelize.STRING
	    },
        scadenza_ricerca: {
            type: Sequelize.DATE
        },
        posizione_aperta: {
            type: Sequelize.BOOLEAN
        },
        pubblica: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);