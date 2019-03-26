const logger = require("../utils/logger");
const httpCodes = require("http-status-codes");
const empty = require("is-empty");
const Handler = require("./command/payment.cmd.handler");
const PaymentCheckoutCommand = require("./command/payment.checkout.cmd");
let handler;
class PaymentController {
  constructor() {}

  /*
   * checkout
   */
  checkout(req, res) {
    logger.info("CHECKOUT", "Starting");
    try {
      let orderId = req.body.orderId;
      let total = req.body.total;

      let command = new PaymentCheckoutCommand(orderId, total);
      handler = new Handler();
      handler
        .checkout(command)
        .then(result => {
          let dataRes = {
            type: "checkout",
            checkout: {
              orderId,
              total,
              status: result // 0: declined, 1: confirmed
            }
          };
          logger.info("CHECKOUT", "Finished!");
          return res.status(httpCodes.OK).json(dataRes);
        })
        .catch(err => {
          logger.error(err.message);
          logger.info("CHECKOUT", "Error!");
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

}

module.exports = PaymentController;
