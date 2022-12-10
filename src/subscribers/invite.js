class InviteSubscriber {
  constructor({ smtpService, eventBusService }) {
    this.smtpService_ = smtpService

    this.eventBus_ = eventBusService

    this.eventBus_.subscribe("invite.created", async (data) => {
      await this.smtpService_.sendNotification(
        "invite.created",
        data,
        null
      )
    })
  }
}

export default InviteSubscriber
