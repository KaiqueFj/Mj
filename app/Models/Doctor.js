'use strict'



const { HasMany } = require('@adonisjs/lucid/src/Lucid/Relations')

const Model = use('Model')

const Hash = use('Hash')


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */



class Doctor extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }
    doctorConsul() {
        return this.hasMany('App/Models/Consulta')
    }
}

module.exports = Doctor
