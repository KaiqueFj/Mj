'use strict'
const Consulta = use('App/Models/Consulta')


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  **/

class ConsultaController {

  async store({ request, auth }) {

    const { horario, dataT } = request.all();
    const user = await auth.getUser(); // retorna o user id

    const data = {
      user_id: user.id,
      doctor_id: 1,
      horario: horario,
      data: dataT

    }

    const newEvent = await Consulta.create(data);
    return newEvent;


  }

  async show() {


    const consulta = await Consulta.query()
      .table('consultas')
      .select('users.username', ' hospitals.username', 'doctors.name', 'especialidades.title', 'horario', 'data')
      .innerJoin('users ', 'users.id ', 'consultas.user_id')
      .innerJoin('doctors  ', 'doctors.id  ', ' consultas.doctor_id')
      .innerJoin('especialidades  ', 'doctors.id_esp ', ' especialidades.id')
      .innerJoin('hospitals   ', ' especialidades.id_hosp ', 'hospitals.id')
      .fetch()

    return consulta
  }
}



module.exports = ConsultaController








  //Registra um evento

//     async schedule({ request, auth }) {

//         const { doctors, schedule, location, dateI , dateF, time } = request.all(); // info do evento
//         const user = await auth.getUser(); // retorna o user id

//         //campos que seram utilizados
//         const data = {
//             user_id: user.id,
//             doctor:doctor,
//             schedule: schedule,
//             location: location,
//             dateI: dateI,
//             dateF: dateF,
//             time: time
//         }

//         const newEvent = await Consulta.create(data);
//         console.log(dateI)
//         console.log(dateF)

//         return newEvent;


//     }

//     //busca o evento pela data e retorna as informações sobre ele
//     async show({ auth }) {
//         await auth.check()
//         const user = await auth.getUser()

//         const consulta = await Consulta.query().where('user_id', user.id).fetch()
//         return consulta
//       }
// }

