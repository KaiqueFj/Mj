'use strict'
const User = use('App/Models/User')
const Consulta = use('App/Models/Consulta')


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class ConsultaController {

    //Registra um evento

    async schedule({ request, auth }) {

        const { doctor, schedule, location, dateI , dateF, time } = request.all(); // info do evento
        const user = await auth.getUser(); // retorna o user id

        //campos que seram utilizados
        const data = {
            user_id: user.id,
            doctor:doctor,
            schedule: schedule,
            location: location,
            dateI: dateI,
            dateF: dateF,
            time: time
        }

        const newEvent = await Consulta.create(data);
        console.log(dateI)
        console.log(dateF)

        return newEvent;


    }

    //busca o evento pela data e retorna as informações sobre ele
    async show({ auth }) {
        await auth.check()
        const user = await auth.getUser()
    
        const consulta = await Consulta.query().where('user_id', user.id).fetch()
        return consulta
      }
}


module.exports = ConsultaController
