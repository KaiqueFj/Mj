'use strict'

const Doc = use('App/Models/Doctor')
const Mail = use('Mail') // Adonis' mail


class DoctorController {

  async register({ request, response, auth }) {
    const doctor_data = request.all();
    const { email } = request.only('email');
    const { name } = request.only('name');
    const doctor = await Doc.create(doctor_data);

    const { token } = await auth.generate(doctor);

    await Mail.send('emails.welcome', doctor.toJSON(), (message) => {
      message
        .to(email)
        .from('kaiqueteste26@gmail.com')
        .subject('Bem-vindo ao nosso projeto de TCC!')
    })
    await doctor.save()

    return response.status(201).send({ token, name });

  }

}

module.exports = DoctorController
