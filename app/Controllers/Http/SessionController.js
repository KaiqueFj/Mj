"use strict";

const User = use('App/Models/User');
const Evento = use('App/Models/Evento');


class SessionController {
  async login({ request, auth, response}) {
    const { email, password } = request.all()

    try {

      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email)
        const acessToken = await auth.generate(user)
        return response.json(acessToken)
      }

      
    } catch (error) {
      console.log("email ou senha inválidos");
    }
  }

  index({auth, response, params}) {
    try{
      const evento = Evento.all()
      return evento

    } catch {
      return response.json("deu merda")
    }

  }


}


module.exports = SessionController;