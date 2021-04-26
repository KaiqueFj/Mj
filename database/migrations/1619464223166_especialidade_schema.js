'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspecialidadeSchema extends Schema {
  up () {
    this.create('especialidades', (table) => {
      table.increments()

      table
      .integer('id_hosp')
      .unsigned()
      .references('id')
      .inTable('hospitals')



      table.string('title', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('especialidades')
  }
}

module.exports = EspecialidadeSchema
