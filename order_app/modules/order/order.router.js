const express = require('express');
const OrderController = require('./order.controller');

// Create our Express router
const router = express.Router();

let controller = new OrderController();

// Create endpoint handlers for order
router.route('/orders/:orderId/status').get(controller.checkOrderStatus);
router.route('/orders').post(controller.addOrder);
router.route('/orders/:orderId/cancel').put(controller.cancelOrder);
module.exports = router;
