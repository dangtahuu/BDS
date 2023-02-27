const express = require('express');
const router = express.Router();
const feeController = require('./fee.controller');
const { auth } = require('../../middleware');

router.delete('/:id', auth, feeController.deleteFee);
router.post('/', auth, feeController.createFee);
router.get('/', auth, feeController.getAllFees);

module.exports = router;