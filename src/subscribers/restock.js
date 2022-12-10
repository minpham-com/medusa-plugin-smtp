class RestockNotification {
  constructor({ eventBusService, smtpService }) {
    eventBusService.subscribe(
      "restock-notification.restocked",
      async (eventData) => {
        const templateId = await smtpService.getTemplateId(
          "restock-notification.restocked"
        )

        if (!templateId) {
          return
        }

        const data = await smtpService.fetchData(
          "restock-notification.restocked",
          eventData,
          null
        )

        if (!data.emails) {
          return
        }

        return await Promise.all(
          data.emails.map(async (e) => {
            const sendOptions = {
              template_id: templateId,
              from: smtpService.options_.from,
              to: e,
              dynamic_template_data: data,
            }

            return await smtpService.sendEmail(sendOptions)
          })
        )
      }
    )
  }
}

export default RestockNotification
