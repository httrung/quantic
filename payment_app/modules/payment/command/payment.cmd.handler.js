const PaymentModel = require('./payment.model');
let model;
class PaymentCmdHandler {
    constructor() {
        model = new PaymentModel();
    }

    checkout(command) {
        return model.checkout(command);
    }    
}

module.exports = PaymentCmdHandler;