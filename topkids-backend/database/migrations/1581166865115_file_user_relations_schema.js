'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersRelationshipSchema extends Schema {
  up () {
    this.alter('files', (table) => {
      // alter table

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.alter('files', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = UsersRelationshipSchema
