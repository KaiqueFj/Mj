'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HospitalSchema extends Schema {
  up () {
    this.create('hospitals', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
      table.string('token') // token
      table.timestamp('token_created_at') // date when token was created
    })
  }

  down () {
    this.drop('hospitals')
  }
}

module.exports = HospitalSchema
