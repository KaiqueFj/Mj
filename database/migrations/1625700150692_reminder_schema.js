'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReminderSchema extends Schema {
  up() {
    this.create('reminder', (table) => {
      table.increments()
      table.string('hospital_name', 80).notNullable().unique()
      table.string('doctor_name', 40).notNullable().unique()
      table.string('specialty', 20).notNullable()
      table.string('day', 15).notNullable()
      table.string('schedule', 8).notNullable()
      table.string('status', 14).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('reminder')
  }
}

module.exports = ReminderSchema
