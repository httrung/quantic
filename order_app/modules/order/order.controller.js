const logger = require("../utils/logger");
const httpCodes = require("http-status-codes");
const empty = require("is-empty");
const Handler = require("./command/order.cmd.handler");
const OrderAddCommand = require("./command/order.add.cmd");
const OrderUpdateStateCommand = require("./command/order.update.state.cmd");
const OrderQueryService = require("./query/order.query");
const MasterQueryService = require("../master/query/master.query");
const STATES = require("../enums/states_enum");

let handler;
let service;
let masterService;
class OrderController {
  constructor() {}

  /*
   * check order status
   */
  checkOrderStatus(req, res) {
    logger.info("CHECK-ORDER-STATUS", "Starting");
    try {
      let orderId = req.params.orderId;
      service = new OrderQueryService();
      masterService = new MasterQueryService();
      service
        .getOrderById(orderId)
        .then(order => {
          return [order, masterService.getStateById(order.stateId)]
        })
        .spread((order, state) => {
          let orderRes = Object.assign({}, order, {state});
          let dataRes = {
            type: "order_status",
            order_status: orderRes
          };
          logger.info("CHECK-ORDER-STATUS", "Finish!");
          return res.status(httpCodes.OK).json(dataRes);
        })
        .catch(err => {
          logger.info("CHECK-ORDER-STATUS", "Error!", err.message);
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Check order status error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }

  /*
   * add order
   */
  addOrder(req, res) {
    logger.info("ADD-ORDER", "Starting");
    try {
      let stateId = req.body.stateId;
      let name = req.body.name;
      let notes = req.body.notes;
      let orderDate = req.body.orderDate;
      let total = req.body.total;

      let command = new OrderAddCommand(stateId, name, notes, orderDate, total);
      handler = new Handler();
      handler
        .addOrder(command)
        .then(orderId => {
          let dataRes = {
            type: "order",
            order: {
              id: orderId
            }
          };
          logger.info("ADD-ORDER", "Finished!");
          return res.status(httpCodes.OK).json(dataRes);
        })
        .catch(err => {
          logger.error(err.message);
          logger.info("ADD-ORDER", "Error!");
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Add order error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }

  /*
   * cancel order
   */
  cancelOrder(req, res) {
    logger.info("CANCEL-ORDER", "Starting");
    try {
      let orderId = req.params.orderId;
      let command = new OrderUpdateStateCommand(STATES.CANCELLED);
      handler = new Handler();
      handler
        .updateOrderState(orderId, command)
        .then(result => {
          let dataRes = {
            type: "order",
            order: {
              id: orderId
            }
          };
          logger.info("CANCEL-ORDER", "Finished!");
          return res.status(httpCodes.OK).json(dataRes);
        })
        .catch(err => {
          logger.error(err.message);
          logger.info("CANCEL-ORDER", "Error!");
          return res
            .status(httpCodes.BAD_REQUEST)
            .json({ error: "Cancel order error!!!" });
        });
    } catch (err) {
      logger.error(err);
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ error: "Error when processing!!" });
    }
  }
}

module.exports = OrderController;
