const Promise = require("bluebird");
const logger = require("../../utils/logger");
const PaymentCheckoutCommand = require("./payment.checkout.cmd");

class PaymentModel {
  constructor() {}

  /*
   * checkout order
   */

  checkout(command) {
    if (command instanceof PaymentCheckoutCommand) {
      //logger.info("MODEL PaymentCheckoutCommand", command);
      // process logic check out here

      // returns a random integer between 0 and 1 to order
      let randomNumber = Math.floor(Math.random() * 2);
      logger.info("Random Number return to Order", randomNumber);
      return Promise.resolve(randomNumber);
    } else {
      return Promise.reject(new Error("Command is invalid!"));
    }
  }
}

module.exports = PaymentModel;
