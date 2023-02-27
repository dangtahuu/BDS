const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');
const { auth } = require('../../middleware');

router.post('/', auth, paymentController.createPayment);
router.post('/', auth, paymentController.createPaymentAD);

router.get('/', auth, paymentController.getAllPayments);

module.exports = router;