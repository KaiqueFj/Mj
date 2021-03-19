'use strict'

const User = use('App/Models/User')
const Event = use('App/Models/Evento');
const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail
const { Console } = require('console');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/
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

    return response.status(201).send({ token, name });

  }




  async update({ request, response, params }) {
    const id = params.id
    const { username, password, newPassword } = request
      .only(['username', 'password', 'newPassword'])

    // procura o cliente no db
    const user = await User.findByOrFail('id', id)

    // check se o password antigo está correto
    const passwordCheck = await Hash.verify(password, user.password)

    if (!passwordCheck) {
      return response
        .status(400)
        .send({ message: { error: 'senha incorreta' }, password: password })
    }

    else {
      // atualiza a informação do usuario
      user.username = username
      user.password = newPassword

      // salva a informação
      await user.save()
      return response.send({ message: 'dados salvos com sucesso!' })
    }


  }


  /* Salva uma nova request para o usuario * quando ele solicita a troca da senha  * recebe um novo token para utilizar*/

  async recover({ request }) {
    try {
      // account request password recovery
      const { email } = request.only(['email'])

      // checking if email is registered
      const user = await User.findByOrFail('email', email)

      // generating token
      const token = await crypto.randomBytes(10).toString('hex')

      // registering when token was created and saving token
      user.token_created_at = new Date()
      user.token = token

      // persisting data (saving)
      await user.save()

      await Mail.send('emails.recover', { user, token }, (message) => {
        message
          .to(email)
          .from('obrabodorasta@gmail.com')
          .subject('Recuperação de senha!')
      })

      return user
    } catch (err) {
      console.log(err)
    }
  }

  //update da recuperacao de senha do usuario

  async update({ request, response, params }) {
    const tokenProvided = params.token // token requisitado na url
    const emailRequesting = params.email // request do email na url, para identificação

    const { newPassword } = request.only(['newPassword'])

    // procura no db, o usuario que solicitou
    const user = await User.findByOrFail('email', emailRequesting)



    // check se o token continua o mesmo
    // check se o token, não é um token antigo
    // e faz a requisição do password
    const sameToken = tokenProvided === user.token

    if (!sameToken) {
      return response
        .status(401)
        .send({
          message: {
            error: ' Esse é um Token antigo, ou então, já foi  utilizado'
          }

        })
    }
    console.log(tokenProvided)


    // check se o token ainda é valido (48 hour period)
    const tokenExpired = moment()
      .subtract(2, 'days')
      .isAfter(user.token_created_at)

    if (tokenExpired) {
      return response.status(401).send({ message: { error: 'Token expired' } })
    }

    // salva o novo password
    user.password = newPassword

    // delete o token atual
    user.token = null
    user.token_created_at = null

    // salva a data
    await user.save()
  }

  

  //Registra um evento

  async event({ request, response, auth }) {

    const { title, location, date, time } = request.all(); // info do evento
    const user = await auth.getUser(); // retorna o user id

    const data = {
      user_id: user.id,
      title: title,
      location: location,
      date: date,
      time: time
    }

    const newEvent = await Event.create(data);
    return newEvent;

  
  }

  //busca o evento pela data e retorna as informações sobre ele
  async show({ request, response, auth }) {
    try {
      const { title} = request.only(['title']) // data selecionada
      const user = await auth.getUser(); // retorna o user id

      const event = await Event.query()
        .where({
          user_id: user.id,
          title
        }).fetch()
      //check se o evento existe

      if (event.rows.length === 0) {
        return response
          .status(404)
          .send({
            message: {
              error: 'Evento não encontrado.'
            }
          })
      }

      return event
    } catch (err) {
      if (err.name === 'ModelNotFoundException') {
        return response
          .status(err.status)
          .send({
            message: {
              error: 'Evento não encontrado'
            }
          })
      }
      return response.status(err.status)
    }
  }

  async index({auth, response}) {
    const { day } = await request.all()
    try {
      //Get user informations
      await auth.check()
      const dia = await Event.findByOrFail('day',day)
      return dia

    } catch (error) {
      console.log(error);
    }
  }

  // async destroy ({ params, auth, response }) {
  //     const user = await auth.getUser(); // retorna o user id

  //   if (property.user_id !== auth.user.id) {
  //     return response.status(401).send({ error: 'Not authorized' })
  //   }


  //   await property.delete()
  // }

}


module.exports = UserController

  // async auth({ request, auth, response }) {
  //   const { email, password } = request.all()

  //   try {
  //     if (await auth.attempt(email, password)) {
  //       const user = await User.findBy('email', email)
  //       const acessToken = await auth.generate(user)
  //       return response.json({ "user": user, "token": acessToken })
  //     }

  //   } catch {
  //     return response.json({ message: 'You first need to register!' })
  //   }
  // }

  // async showUser({ request, response, auth }) {

  //   try {
  //     // Autentifica o usuário
  //     await auth.getUser();
  //     const data = await User.query()
  //       .where({
  //         user_id: user.id,
  //         email
  //       }).fetch()

  //     return response.json({"data": data});

  //   } catch (error) {
  //     response.send('Missing or invalid jwt token')
  //   }
  // }


  // async register({ request }) {
  //   const data = request.only(['username', 'email', 'password'])
  //   const user = await User.create(data)
  //   return user
  // }
  //retorna  o usuario, após o mesmo fornecer seu username, email e password

  // async authenticate({ request, auth }) {
  //   console.log(request)
  //   const { email, passoword } = request.all()

  //   const token = await auth.attempt(email, passoword)


  //   return token
  // }
  //autentifica o usuario a partir de seu email e password, retornando seu token