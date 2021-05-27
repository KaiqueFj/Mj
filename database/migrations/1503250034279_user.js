'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => { //criação da tabela user, que é o nosso usuario
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.varchar('phoneNumber', 60).unique()
      table.varchar('adress', 60).unique()
      table.varchar('cep', 10).unique()
      table.varchar('height', 4).unique()
      table.varchar('weight', 5).unique()
      table.varchar('age', 3).unique()
      table.varchar('chronic disease', 45).unique()
      table.varchar('profile_image', 45).unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
