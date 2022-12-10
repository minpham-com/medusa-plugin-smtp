class OrderSubscriber {
  constructor({ notificationService }) {
    this.notificationService_ = notificationService

    this.notificationService_.subscribe("order.shipment_created", "smtp")
    this.notificationService_.subscribe("order.gift_card_created", "smtp")
    this.notificationService_.subscribe("gift_card.created", "smtp")
    this.notificationService_.subscribe("order.placed", "smtp")
    this.notificationService_.subscribe("order.canceled", "smtp")
    this.notificationService_.subscribe("customer.password_reset", "smtp")
    this.notificationService_.subscribe("claim.shipment_created", "smtp")
    this.notificationService_.subscribe("swap.shipment_created", "smtp")
    this.notificationService_.subscribe("swap.created", "smtp")
    this.notificationService_.subscribe("order.items_returned", "smtp")
    this.notificationService_.subscribe("order.return_requested", "smtp")
  }
}

export default OrderSubscriber
