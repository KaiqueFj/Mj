'use strict'

const Hosp = use('App/Models/Hospital')
const Doc = use('App/Models/Doctor')

const Mail = use('Mail') // Adonis' mail


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class HospitalController {
  async store({ request, response, auth }) {

    //hospital information

    try {
      const hosp_data = request.all();
      const user = await Hosp.create(hosp_data);
      const { email } = request.only('email');


      const { token } = await auth.generate(user);

      await Mail.send('emails.welcome', user.toJSON(), (message) => {
        message
          .to(email)
          .from('kaiqueteste26@gmail.com')
          .subject('Bem-vindo ao Saúde em mãos, esperamos que seu hospital faça um bom proveito do App!')
      })

      await user.save()
      return response.status(201).send({ token });

    } catch (error) {
      console.log(error)
    }
  }

  //retrieve all doctors in a hospital
  async hosp_doctor() {
    const hosp = await Doc.query()
      .with('doctors')
      .fetch();

    return hosp
  }


//retrive the hospital information
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

  //retrieve all hospitals in db
  async hosp() {
    const hosp = Hosp.all()
    return hosp
  }
}

module.exports = HospitalController
