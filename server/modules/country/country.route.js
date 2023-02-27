const express = require('express');
const router = express.Router();
const countryController = require('./country.controller')

router.get('/province', countryController.getProvinces)
router.get('/district', countryController.getDistricts)
router.get('/ward', countryController.getWards)

module.exports = router;

