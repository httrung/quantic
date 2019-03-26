class OrderDto {
  constructor(
    id,
    stateId,
    name = "",
    notes = "",
    orderDate,
    total = 0,
  ) {
    this.id = id;
    this.stateId = stateId;
    this.name = name;
    this.notes = notes;
    this.orderDate = orderDate;
    this.total = total;
  }
}

module.exports = OrderDto;
