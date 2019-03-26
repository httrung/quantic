const Promise = require("bluebird");
const axios = require("axios");
const logger = require("../../utils/logger");
const OrderRepository = require("./order.repo");
const OrderAddCommand = require("./order.add.cmd");
const OrderUpdateStateCommand = require("./order.update.state.cmd");
const MasterService = require("../../master/query/master.query");
const AuthConfig = require("../../../config/auth/info");
const PaymentConfig = require("../../../config/payment/info");
const OrderConfig = require("../../../config/order/info");
const PAYMENT_ENUM = require("../../enums/payment_response_enum");
const STATES = require("../../enums/states_enum");

let repo;
let masterService;
class OrderModel {
  constructor() {
    repo = new OrderRepository();
  }

  /*
   * add order
   */
  addOrder(command) {
    if (command instanceof OrderAddCommand) {
      masterService = new MasterService();
      return masterService
        .getStateById(command.state_id) // check state
        .then(state => {
          //state valid
          logger.info("State", state);
          return repo.transaction(t => {
            return repo
              .addOrder(command, t)
              .then(order => {
                return [order, OrderModel.processPayment(order)];
              })
              .spread((order, status) => {
                let timeToDelay = 0;
                if (status === PAYMENT_ENUM.CONFIRMED) {
                  timeToDelay = OrderConfig.TIME_TO_DELAY;
                }
                return [order, status, OrderModel.delayPromise(timeToDelay)];
              })
              .spread((order, status, delay) => {
                let updateCommand;
                if (status === PAYMENT_ENUM.DECLINED) {
                  updateCommand = new OrderUpdateStateCommand(STATES.CANCELLED);
                } else {
                  // confirmed
                  updateCommand = new OrderUpdateStateCommand(STATES.CONFIRMED);
                }
                return [
                  order,
                  status,
                  repo.updateOrderState(order.id, updateCommand, t)
                ];
              })
              .spread((order, paymentStatus, updateStatus) => {
                return Promise.resolve(order.id);
              });
          });
        });
      // .catch(error => {
      //   return Promise.reject(new Error("State is invalid!"));
      // });
    } else {
      return Promise.reject(new Error("Command is invalid!"));
    }
  }

  /*
   * cancel order
   */
  updateOrderState(orderId, command) {
    if (command instanceof OrderUpdateStateCommand) {
      return repo.transaction(t => {
        return repo.updateOrderState(orderId, command, t).then(result => {
          return Promise.resolve(result);
        });
      });
    } else {
      return Promise.reject(new Error("Command is invalid!"));
    }
  }

  /*
   * process payment
   */

  static processPayment(order) {
    return new Promise((resolve, reject) => {
      const paymentService = axios.create({
        baseURL: PaymentConfig.PAYMENT_URL, // 'http://localhost:8081/api/',
        timeout: PaymentConfig.TIMEOUT,
        headers: { Authorization: "Bearer " + AuthConfig.TOKEN }
      });
      return paymentService
        .post("/checkout", {
          orderId: order.id,
          total: order.total
        })
        .then(payment => {
          let dataPayment = payment.data;
          let status = dataPayment.checkout.status;
          //logger.info("Payment status::", status);
          resolve(status);
        });
    });
  }

  static delayPromise(ms) {
    return new Promise((r, j) => setTimeout(r, ms));
  }
}

module.exports = OrderModel;
