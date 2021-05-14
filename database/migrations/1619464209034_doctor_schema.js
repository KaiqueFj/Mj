'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoctorSchema extends Schema {
  up () {
    this.create('doctors', (table) => {
      table.increments()


      table
      .integer('id_esp')
      .unsigned()
      .references('id')
      .inTable('especialidades')

      table
      .integer('id_hosp')
      .unsigned()
      .references('id')
      .inTable('hospitals')





      table.string('name', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.timestamps()



    })
  }

  down () {
    this.drop('doctors')
  }
}

module.exports = DoctorSchema
