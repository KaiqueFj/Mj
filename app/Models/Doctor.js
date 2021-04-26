'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Doctor extends Model {
    doctorConsul () {
        return this.hasMany('App/Models/Consulta')
    }
}

module.exports = Doctor
