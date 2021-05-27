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
      table.string('week_day').notNullable()
      table.string('title').notNullable()
      table.date('date_medicine').notNullable()      
      table.varchar('time').notNullable()      
      table.timestamps()
    })
  }

  down() {
    this.drop('medicines')
  }
}

module.exports = EventosSchema
