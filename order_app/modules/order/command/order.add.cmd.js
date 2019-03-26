class OrderAddCommand {
    constructor(stateId, name, notes, orderDate, total) {
        this.state_id = stateId;
        this.name = name;
        this.notes = notes;
        this.order_date = orderDate;
        this.total = total;
    }
}

module.exports = OrderAddCommand;