const express = require('express');
const OrderController = require('./payment.controller');
const Authorization = require('../authorization/authorization.controller');
// Create our Express router
const router = express.Router();

let controller = new OrderController();
let auth = new Authorization();

// Create endpoint handlers for order
router.route('/checkout').post(auth.isAuthorized, controller.checkout);
module.exports = router;
