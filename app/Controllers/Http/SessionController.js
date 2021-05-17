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

  //Ally provider Facebook API


  async redirect ({ ally }) {
    await ally.driver('google').redirect()
  }

  async callback ({ ally, auth }) {
    try {
      const gogUser = await ally.driver('google').getUser()

      // user details to be saved
      const userDetails = {
        email: gogUser.getEmail(),
        token: gogUser.getAccessToken(),
        login_source: 'google'
      }

      // search for existing user
      const whereClause = {
        email: gogUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return 'Logged in'
    } catch (error) {
      return 'Unable to authenticate. Try again later'
    }
  }
}



module.exports = SessionController;