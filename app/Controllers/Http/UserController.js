'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

//Register
class UserController {
  async store({ request, response, auth }) {
    const user_data = request.all();
    const { email } = request.only('email');
    const { name } = request.only('name');
    const user = await User.create(user_data);

    const { token } = await auth.generate(user);

    await Mail.send('emails.welcome', user.toJSON(), (message) => {
      message
        .to(email)
        .from('kaiqueteste26@gmail.com')
        .subject('Bem-vindo ao nosso projeto de TCC!')
    })
    await user.save()

    return response.status(201).send({ token, name });

  }

  async index({auth, response}) {
    try {
      //Get user informations
      await auth.check()
      const user = await auth.getUser()
      return user

    } catch(error){
      response.send(error)
    }
  }


}


module.exports = UserController


  // async destroy ({ params, auth, response }) {
  //     const user = await auth.getUser(); // retorna o user id

  //   if (property.user_id !== auth.user.id) {
  //     return response.status(401).send({ error: 'Not authorized' })
  //   }


  //   await property.delete()
  // }

