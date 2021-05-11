"use strict";

const User = use('App/Models/User');
const Event = use('App/Models/Medicine')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/


class SessionController {
  async login({ request, auth }) {


    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password);
      return token;
    } catch (error) {
      console.log("email ou senha inválidos");
    }
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

}


module.exports = SessionController;