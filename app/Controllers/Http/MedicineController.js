'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const Mail = use('Mail') // Adonis' mail

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class MedicineController {

    //Registra um evento

    async event({ request, response, auth }) {

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
    async show({ request, response, auth }) {
        try {
            const { title } = request.only(['title']) // data selecionada
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
}

module.exports = MedicineController
