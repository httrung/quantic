const logger = require("../../utils/logger");
const DBManager = require("../../utils/database_manager");
const Sequelize = require("sequelize");

let dbManager;
let sequelize;
let Order;

class OrderRepository {
  constructor() {
    dbManager = new DBManager();
    if (dbManager.checkInitDB()) {
      sequelize = dbManager.getSequelize();
      Order = sequelize.import("./../../../models/order");
    }
  }

  /*
   * add order
   */
  addOrder(command, t) {
    return Order.create(command, {
      transaction: t
    });
  }

  /*
   * update order state by order id
   */
  updateOrderState(orderId, orderUpdateStateCommand, t) {
    logger.info("Order DAO::", orderId, orderUpdateStateCommand);
    return Order.update(orderUpdateStateCommand, {
      where: {
        id: orderId
      },
      transaction: t
    });
  }

  transaction(txnFunction) {
    return sequelize.transaction(txnFunction);
  }
}

module.exports = OrderRepository;
