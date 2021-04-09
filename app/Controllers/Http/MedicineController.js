'use strict'
const User = use('App/Models/User')
const Event = use('App/Models/Medicine')

const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class MedicineController {

    //Registra um evento

    async store({ request, auth }) {

        const { day, title, location, date, time } = request.all(); // info do evento
        const user = await auth.getUser(); // retorna o user id

        const data = {
            user_id: user.id,
            day: day,
            title: title,
            location: location,
            date: date,
            time: time
        }

        const newEvent = await Event.create(data);
        return newEvent;


    }

    //busca o evento pela data e retorna as informações sobre ele
    async show({auth, response}) {
        try {
            await auth.check()

          //Get user informations
          const medicine = await Event.all();
          return medicine
    
        } catch(error){
          response.send(error)
        }
      }


      //busca o evento pela data e retorna as informações sobre ele
      async test() { 

        const med = await Event.query()
        .with('user')
        .fetch();

        return med
        }
    
}

module.exports = MedicineController
