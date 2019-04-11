const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("daleRecruiting", "root", "", {
    host: "localhost",
    dialect: "mysql",

    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;