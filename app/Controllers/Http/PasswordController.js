'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/
class PasswordController {

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
              .from('kaiqueteste26@gmail.com')
              .subject('Recuperação de senha!')
          })
    
          return user
        } catch (err) {
          console.log(err)
        }
      }
    
      //update da recuperacao de senha do usuario
}

module.exports = PasswordController
