
var express = require('express');
var router = express.Router();
var RSIController = require(`../controllers/RSIController.js`);
var binanceValidation = require(`./validation/binanceValidation.js`);

/* GET home page. */
router.get('/', RSIController.getCurrency);
router.post('/getRSI', [binanceValidation.getRSIValidation], RSIController.getRSI);

module.exports = router;
