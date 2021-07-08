'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reminder extends Model {
    Reminder() {
        return this.belongsTo('App/Models/User')
      }
}

module.exports = Reminder
