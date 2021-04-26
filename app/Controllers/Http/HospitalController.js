'use strict'

const User = use('App/Models/Hospital')
const Medicine = use('App/Models/Medicine')

const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail

const Database = use('Database')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class HospitalController {
    async store({ request, response, auth }) {
        const hosp_data = request.all();
        const { email } = request.only('email');
        const { name } = request.only('name');
        
        const user = await User.create(hosp_data);
    
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

      async login({ request, auth }) {

        try {

          return User.all()
     
        } catch (error) {
          console.log(error);
        }
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

      async teste() {
        const medicine = await Medicine.query()
        .table('users')
        .innerJoin('medicines', 'users.id', 'medicines.user_id')
        .fetch()
       
        return medicine
      }
    
    
}

module.exports = HospitalController
