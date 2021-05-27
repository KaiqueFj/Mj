'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments()
      table.varchar('initial_hour', 45).notNullable().unique()
      table.varchar('final_hour', 254).notNullable().unique()
      table.timestamps()

      table
      .integer('appointment_id')
      .unsigned()
      .references('id')
      .inTable('consultas')

      table
      .integer('day_id')
      .unsigned()
      .references('id')
      .inTable('days')
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
