'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Giftcard extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'GiftCardCreateHook.sendNewGiftCardMail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Giftcard
