'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agenda extends Model {
    agenda_day() {
        return this.hasMany('App/Models/Day')
      }
}

module.exports = Agenda
