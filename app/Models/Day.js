'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Day extends Model {
    days() {
        return this.hasMany('App/Models/Schedule')
      }
}

module.exports = Day
