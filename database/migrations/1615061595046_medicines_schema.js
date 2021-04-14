'use strict'

const Schema = use('Schema')

class EventosSchema extends Schema {
  up() {
    this.create('medicines', (table) => {  //criação da tabela eventos no db, e sua estrutura
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('medicine').notNullable()
      table.varchar('dateI').notNullable()      
      table.varchar('dateF').notNullable()      
      table.varchar('time').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('medicines')
  }
}

module.exports = EventosSchema
