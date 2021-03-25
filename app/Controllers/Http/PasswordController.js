'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/
class PasswordController {

  async update ({ request, response, params }) {
    const id = params.id
    const { username, password, newPassword } = request
      .only(['username', 'password', 'newPassword'])

    // looking for user in DB
    const user = await User.findByOrFail('id', id)

    // checking if old password informed is correct
    const passwordCheck = await Hash.verify(password, user.password)

    if (!passwordCheck) {
      return response
        .status(400)
        .send({ message: { error: 'Incorrect password provided' } })
    }

    // updating user data
    user.username = username
    user.password = newPassword

    // persisting new data (saving)
    await user.save()
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
              .from('kaiqueteste26@gmail.com')
              .subject('Recuperação de senha!')
          })
    
          return user
        } catch (err) {
          console.log(err)
        }
      }
     

}

module.exports = PasswordController

