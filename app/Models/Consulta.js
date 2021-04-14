'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Consulta extends Model {
    show_consulta() {
        return this.belongsTo('App/Models/User')
    }    
}

module.exports = Consulta
