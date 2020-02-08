'use strict'

const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/MailNewGiftCard')

const GiftCardCreateHook = exports = module.exports = {}

GiftCardCreateHook.sendNewGiftCardMail = async (giftcard) => {
  const { user_id } = giftcard
  const emailTo = 'admin@topkids.io'
  const emailFrom = 'admin@topkids.io'

  const user = await User.findBy('id', user_id)
  console.log(`giftcard: ${giftcard.name}`)
  if (user) {
    Kue.dispatch(Job.key,
      { giftcard, emailFrom, emailTo },
      { attemps: 3 }
    )
  }
}
