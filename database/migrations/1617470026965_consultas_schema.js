'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConsultasSchema extends Schema {
  up () {
    this.create('consultas', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('day').notNullable()
      table.string('doctor').notNullable()
      table.string('schedule').notNullable()
      table.string('location').notNullable()
      table.datetime('date').notNullable()
      table.time('time').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('consultas')
  }
}

module.exports = ConsultasSchema
