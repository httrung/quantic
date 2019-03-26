class PaymentCheckoutCommand {
    constructor(orderId, total) {
        this.orderId = orderId;
        this.total = total;
    }
}

module.exports = PaymentCheckoutCommand;