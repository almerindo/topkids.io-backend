'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Giftcard extends Model {
  giftcards () {
    return this.hasOne('App/Models/User')
  }

  files () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = Giftcard
