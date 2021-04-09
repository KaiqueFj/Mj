'use strict'
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class ConsultaController {

    //Registra um evento

    async schedule({ request, auth }) {

        const { day,doctor, schedule, location, date, time } = request.all(); // info do evento
        const user = await auth.getUser(); // retorna o user id

        //campos que seram utilizados
        const data = {
            user_id: user.id,
            day: day,
            doctor:doctor,
            schedule: schedule,
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
            const { schedule } = request.only(['schedule']) // data selecionada
            const user = await auth.getUser(); // retorna o user id

            const event = await Event.query()
                .where({
                    user_id: user.id,
                    schedule
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


module.exports = ConsultaController
