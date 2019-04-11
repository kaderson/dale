const express = require('express');
const router = express.Router();
const cors = require('cors');
const Candidati = require("../models/candidati.model");
const Ricerche = require("../models/ricerche.model");

router.use(cors());

router.post('/create', (req, res) => {
    const candidati = req.body;
    Candidati.create(candidati)
        .then(created => {
            res.status(200).json(created);
        })
        .catch(error =>
            res.send('Errore: ' + error)
        )
}
)
router.get('/job', (req,res) =>{
    const posizioni_aperte= "";
    Ricerche.findAll({
        where:{
            pubblica:1
        }
    })
    .then(pos => {
        this.posizioni_aperte=pos;
        res.status(200).json(this.posizioni_aperte);
    })

})
//Get a Ricerca
router.get('/ric/:idRic', (req, res) => {
  
        Ricerche.findOne({
            where: {
                id_ricerca: req.params.idRic
            }
        }).then(found => {
            res.status(200).json(found);
        }).catch(error =>
                res.send('Errore: ' + error)
            )
});



module.exports = router;