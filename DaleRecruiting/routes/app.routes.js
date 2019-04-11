var express = require('express');
var router = express.Router();
var utente = require('./utente.routes');
var candidati  = require('./candidati.routes');
var ricerche = require('./ricerche.routes');
var skills = require('./skills.routes');
var foreign = require('./foreign.routes');

router.use('/utente', utente);
router.use('/candidati', candidati);
router.use('/ricerche', ricerche);
router.use('/skills', skills);
router.use('/foreign', foreign);


module.exports = router;