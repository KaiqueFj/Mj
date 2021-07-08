'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }
  show_medicine() {
    return this.hasMany('App/Models/Medicine')
  }

  hospitals() {
    return this.hasMany('App/Models/Hospital')
  }

  show_consulta() {
    return this.hasMany('App/Models/Consulta')
  }

  Reminder() {
    return this.hasMany('App/Models/Reminder')
  }
}

module.exports = User
