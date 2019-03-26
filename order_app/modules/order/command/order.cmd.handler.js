const logger = require('../../utils/logger');
const Promise = require('bluebird');
const OrderModel = require('./order.model');
let model;
class OrderCmdHandler {
    constructor() {
        model = new OrderModel();
    }

    addOrder(command) {
        return model.addOrder(command);
    }
    
    updateOrderState(orderId, command) {
        return model.updateOrderState(orderId, command);
    }
}

module.exports = OrderCmdHandler;