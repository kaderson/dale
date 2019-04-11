const express = require('express');
const router = express.Router();
const cors = require('cors');
const Skill = require("../models/skills.model");
const Utente = require("../models/utente.model");
const jwt = require("jsonwebtoken");
const Candidati= require("../models/candidati.model");
router.use(cors());

//Get a Skill
router.get('/:idSkill', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Skill.findOne({
            where: {
                id_skill: req.params.idSkill
            }
        }).then(found => {
            res.status(200).json(found);
        })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Get All Skills
router.get('', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Skill.findAll()
            .then(all => {
                res.status(200).json(all);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Create a Skill
router.post('', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        const skill=req.body;
        console.log(skill);
        Skill.create(skill)
            .then(created => {
                res.status(200).json(created);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Update a Skill
router.put('/:idSkill', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        const update = req.body;
        const idSkill = req.params.idSkill;
        Skill.update(update,
            { where: { id_skill: idSkill } })
            .then(() => {
                res.status(200).json('Aggiornato correttamente il record con id=' + req.params.idSkill);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

//Delete a Skill
router.delete('/:idSkill', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    Utente.findOne({
        where: {
            id_utente: decoded.id_utente
        }
    }).then(() => {
        Skill.destroy(
            { where: { id_skill: req.params.idSkill } })
            .then(() => {
                res.status(200).json('Eliminato correttamente il record con id=' + req.params.idSkill);
            })
            .catch(error =>
                res.send('Errore: ' + error)
            )
    })
});

module.exports = router;