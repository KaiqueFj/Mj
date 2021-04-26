'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConsultaSchema extends Schema {
  up() {
    this.create('consultas', (table) => {
      table.increments()


      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')



      table
      .integer('doctor_id')
      .unsigned()
      .references('id')
      .inTable('doctors')


      table.string('horario', 80).notNullable().unique()
      table.date('data', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('consultas')
  }
}

module.exports = ConsultaSchema
