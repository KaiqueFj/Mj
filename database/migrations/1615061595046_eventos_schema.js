'use strict'

const Schema = use('Schema')

class EventosSchema extends Schema {
  up() {
    this.create('eventos', (table) => {  //criação da tabela eventos no db, e sua estrutura
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.string('location').notNullable()
      table.datetime('date').notNullable()
      table.time('time').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('eventos')
  }
}

module.exports = EventosSchema
