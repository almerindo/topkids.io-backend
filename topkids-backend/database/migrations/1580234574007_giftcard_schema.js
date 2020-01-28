'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GiftcardSchema extends Schema {
  up () {
    this.create('giftcards', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('description')
      table.integer('price')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.timestamps()
    })
  }

  down () {
    this.drop('giftcards')
  }
}

module.exports = GiftcardSchema
