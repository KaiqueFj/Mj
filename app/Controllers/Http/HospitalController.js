'use strict'

const Hosp = use('App/Models/Hospital')

const Mail = use('Mail') // Adonis' mail


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class HospitalController {
  async store({ request, response }) {

    try {
      const hosp_data = request.all();

      const user = await Hosp.create(hosp_data);
      await user.save()

      return response.status(201).send("Hospital cadastrado com sucesso");

    } catch (error) {
      console.log(error)
    }
  }

  //retrieve all hospitals
  async show() {
    const hosp = Hospital.all()
    return hosp
  }



  async index({ auth, response }) {
    try {
      //Get user informations
      await auth.check()
      const user = await auth.getUser()
      return user

    } catch (error) {
      response.send(error)
    }
  }

  //retrieve all hospitals

  async hosp() {

    const hosp = Hosp.all()

    return hosp

  }
}

module.exports = HospitalController
