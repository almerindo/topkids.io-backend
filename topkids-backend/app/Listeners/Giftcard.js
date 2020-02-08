'use strict'

const Giftcard = exports = module.exports = {}
const Mail = use('Mail')

Giftcard.new = async (giftcard) => {
  Mail.send(['emails.new_giftcard'],
    {
      name: giftcard.name,
      description: giftcard.description,
      price: giftcard.price
    }
    , (message) => {
      message.to('contato@topkids.io')
      message.from('contato@topkids.io')
    })
  // console.log(giftcard.name)
}
