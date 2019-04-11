const express = require("express");
const utente = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Utente = require("../models/utente.model");
utente.use(cors());

process.env.SECRET_KEY = 'secret';

//Post Login
utente.post('/login', (req, res) => {
    const utenteData = {
        username: req.body.username,
        password: req.body.password
    }
    Utente.findOne({
        where: {
            username: utenteData.username,
            password: utenteData.password
        }
    })
        .then(user => {
            if (user) {
                const hash = bcrypt.hashSync(utenteData.password, 10);
                utenteData.password = hash;
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 7200
                })
                res.json({ token: token });
            }
            else {
                res.status(401).send("L'utente non esiste");
            }
        })
        .catch(error =>
            res.send('Errore: ' + error)
        )
});

module.exports = utente;