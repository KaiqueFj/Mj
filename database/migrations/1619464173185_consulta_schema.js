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



      
      table.timestamps()
    })
  }

  down() {
    this.drop('consultas')
  }
}

module.exports = ConsultaSchema
