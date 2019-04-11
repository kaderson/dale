const express = require('express');
const router = express.Router();
const cors = require('cors');
const Ricerca = require("../models/ricerche.model");
const Utente = require("../models/utente.model");
const jwt = require("jsonwebtoken");
const db = require('../database/db');

router.use(cors());

//Get a Ricerca
router.get('/ric/:idRic', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Ricerca.findOne({
            where: {
                id_ricerca: req.params.idRic
            }
        }).then(found => {
            res.status(200).json(found);
        })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Get All Ricerca
router.get('/ric', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Ricerca.findAll()
            .then(all => {
                res.status(200).json(all);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Create a Ricerca
router.post('/ric', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        const ricerca = req.body;
        Ricerca.create(ricerca)
            .then(created => {
                res.status(200).json(created);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Update a Ricerca
router.put('/ric/:idRic', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        const update = req.body;
        const id = req.params.idRic;
        Ricerca.update(update,
            { where: { id_ricerca: id } })
            .then(() => {
                res.status(200).json('Aggiornato correttamente il record con id=' + req.params.idRic);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Delete a Ricerca
router.delete('/ric/:idRic', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Ricerca.destroy(
            { where: { id_ricerca: req.params.idRic } })
            .then(() => {
                res.status(200).json('Eliminato correttamente il record con id=' + req.params.idRic);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Ricerca Anagrafica
router.post("/an/:idRic", (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        let idRic = req.params.idRic;
        let ricerca = req.body;
        let query = {};
        for (let pos in ricerca) {
            switch (pos) {
                case 'tipo_posizione':
                    query[pos] = db.sequelize.query('SELECT anagrafica.* FROM anagrafica, ricerca WHERE ricerca.id_ricerca = :id AND anagrafica.tipo_posizione = ricerca.tipo_posizione AND anagrafica.tipo_posizione LIKE :pos',
                        { replacements: { id: req.params.idRic, pos: req.body.tipo_posizione }, type: db.sequelize.QueryTypes.SELECT }).then(
                            result => res.send(result)
                        )
                    break;

                default:
                    break;
            }
        }
    })
});

module.exports = router;