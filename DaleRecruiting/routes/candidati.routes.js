const express = require('express');
const router = express.Router();
const cors = require('cors');
const Candidati = require("../models/candidati.model");
const Utente = require("../models/utente.model");
const jwt = require("jsonwebtoken");

router.use(cors());

//Get a Candidato
router.get('/:idCand', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Candidati.findOne({
            where: {
                id_candidato: req.params.idCand
            }
        }).then(found => {
            res.status(200).json(found);
        })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Get All Candidati
router.get('', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Candidati.findAll()
            .then(all => {
                res.status(200).json(all);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Update a Candidato
router.put('/:idCand', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        const update = req.body;
        const id = req.params.idCand;
        Candidati.update(update,
            { where: { id_candidato: id } })
            .then(() => {
                res.status(200).json('Aggiornato correttamente il record con id=' + req.params.idCand);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Delete a Candidato
router.delete('/:idCand', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Candidati.destroy(
            { where: { id_candidato: req.params.idCand } })
            .then(() => {
                res.status(200).json('Eliminato correttamente il record con id=' + req.params.idCand);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

module.exports = router;