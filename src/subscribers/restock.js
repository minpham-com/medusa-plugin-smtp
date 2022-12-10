class RestockNotification {
  constructor({ eventBusService, smtpService }) {
    eventBusService.subscribe(
      'restock-notification.restocked',
      async (eventData) => {
        const templateName = await smtpService.getTemplateNameForEvent(
          'restock-notification.restocked'
        )

        if (!templateName) {
          return
        }

        const data = await smtpService.fetchData(
          'restock-notification.restocked',
          eventData,
          null
        )

        if (!data.emails) {
          return
        }

        return await Promise.all(
          data.emails.map(async (e) => {
            const sendOptions = {
              template: templateName,
              message: {
                to: e,
              },
              locals: {
                data: data,
                env: process.env,
              },
            }

            return await smtpService.sendEmail(sendOptions)
          })
        )
      }
    )
  }
}

export default RestockNotification
