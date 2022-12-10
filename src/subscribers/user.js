class UserSubscriber {
  constructor({ smtpService, eventBusService }) {
    this.smtpService_ = smtpService

    this.eventBus_ = eventBusService

    this.eventBus_.subscribe("user.password_reset", async (data) => {
      await this.smtpService_.sendNotification(
        "user.password_reset",
        data,
        null
      )
    })
  }
}

export default UserSubscriber
