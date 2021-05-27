'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DaySchema extends Schema {
  up() {
    this.create('days', (table) => {
      table.increments()
      table.string('dia').notNullable()
      table.timestamps()


      table
        .integer('agenda_id')
        .unsigned()
        .references('id')
        .inTable('agenda')
    })
  }

  down() {
    this.drop('days')
  }
}

module.exports = DaySchema
