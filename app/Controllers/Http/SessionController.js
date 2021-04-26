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

  index({ auth, response, params }) {
    try {
      const evento = Event.all()
      return evento

    } catch {
      return response.json("deu merda")
    }

  }


}


module.exports = SessionController;