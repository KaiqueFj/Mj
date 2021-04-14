'use strict'
const User = use('App/Models/User')
const Medicine = use('App/Models/Medicine');



/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/
class MedicineController {

  //Registra um evento

  async store({ request, auth }) {

    const {  medicine, dateI, dateF, time } = request.all(); // info do evento
    const user = await auth.getUser(); // retorna o user id

    const data = {
      user_id: user.id,
      medicine: medicine,
      dateI: dateI,
      dateF: dateF,
      time: time
    }

    const newEvent = await Medicine.create(data);
    return newEvent;


  }

  //busca o evento pela data e retorna as informações sobre ele
  async show({ auth }) {
    await auth.check()
    const user = await auth.getUser()

    const medicine = await Medicine.query().where('user_id', user.id).fetch()
    return medicine
  }

  //busca o evento pela data e retorna as informações sobre ele

  async teste({ params }) {
    const id = params.id
    const user = await User.findByOrFail('id', id)
    const tab = await medicine.query().with('user').fetch();
    return tab
  }

}

module.exports = MedicineController
