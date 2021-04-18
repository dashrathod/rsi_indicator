
var express = require('express');
var router = express.Router();
var RSIController = require(`../controllers/RSIController.js`);

/* GET home page. */
router.get('/', RSIController.getCurrency);

module.exports = router;
