const express = require("express");

const ratesController = require('../controllers/rates');

const router = express.Router();

router.get('/current', ratesController.getCurrentRates);

router.get('/historical', ratesController.getHistoricalRates);

module.exports = router;