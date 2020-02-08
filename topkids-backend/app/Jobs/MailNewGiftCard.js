'use strict'

const Mail = use('Mail')

class MailNewGiftCard {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'MailNewGiftCard-job'
  }

  async handle ({ giftcard, emailFrom, emailTo }) {
    console.log('MailNewGiftCard-job started')

    Mail.send(['emails.new_giftcard'],
      {
        name: giftcard.name,
        description: giftcard.description,
        price: giftcard.price
      }
      , (message) => {
        message
          .to(emailTo)
          .from(emailFrom)
          .subject(`Giftcard Adicionado: ${giftcard.name} por UserID: ${giftcard.user_id}`)
      })
  }
}

module.exports = MailNewGiftCard
