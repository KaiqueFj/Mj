'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Especialidade extends Model {
    esp_med () {
        return this.hasMany('App/Models/Doctor')
    }
}

module.exports = Especialidade
