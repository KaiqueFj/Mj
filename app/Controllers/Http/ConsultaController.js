'use strict'
const Consulta = use('App/Models/Consulta')
const Doc = use('App/Models/Doctor')



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

  async show_schedule() {
    //schedule

    const consulta = await Doc.query()
      .table('doctors')
      .select('doctors.doctor_name', 'hospital.hospital_name', 'especialidade.title', 'dia.dia')
      .innerJoin('especialidade', 'especialidade.esp_id', 'doctor.esp_id')
      .innerJoin('hospital', 'hospital.hospital_id', 'especialidade.hospital_id')
      .innerJoin('Agenda', 'doctor.doctor_id', 'Agenda.doctor_id')
      .innerJoin('dia', 'Agenda.Agenda_id', 'dia.Agenda_id')
      .fetch()

    return consulta
  }

  async show_day() {
    //Day
    const day = await Doc.query()
      .table('doctors')
      .select('doctor.doctor_name', 'hospital.hospital_name', 'especialidade.title', 'dia.dia')
      .innerJoin('especialidade', 'especialidade.esp_id', 'doctor.esp_id')
      .innerJoin('hospital', 'hospital.hospital_id', 'especialidade.hospital_id')
      .innerJoin('Agenda', 'doctor.doctor_id', 'Agenda.doctor_id')
      .innerJoin('dia', 'Agenda.Agenda_id', 'dia.Agenda_id')
      .fetch()

    return day
  }

  async show_hours() {
    //Day
    const day = await Doc.query()
      .table('doctors')
      .select('doctor.doctor_name', 'hospital.hospital_name', 'especialidade.title', 'dia.dia', 'horario.initial', 'horario.final')
      .innerJoin('especialidade', 'especialidade.esp_id', 'doctor.esp_id')
      .innerJoin('hospital', 'hospital.hospital_id', 'especialidade.hospital_id')
      .innerJoin('Agenda', 'doctor.doctor_id', 'Agenda.doctor_id')
      .innerJoin('dia', 'Agenda.Agenda_id', 'dia.Agenda_id')
      .innerJoin('horario', 'dia.id', 'horario.day_id')
      .fetch()

    return day
  }

  async appointment() {
    //Day
    const day = await Consulta.query()
      .table('consulta')
      .select('doctor.doctor_name', 'especialidade.title', 'hospital.hospital_name', 'horario.initial', 'dia.dia')
      .innerJoin('dia', 'horario.day_id', 'dia_id')
      .innerJoin('agenda', 'dia.schedule_id', 'agenda.schedule_id')
      .innerJoin('doctor', 'agenda.doctor_id', 'doctor.doctor_id')
      .innerJoin('especialidade', 'doctor.esp_id', 'especialidade.esp_id')
      .innerJoin('hospital', 'especialidade.hospital_id', 'hospital.hospital_id')
      .fetch()

    return day
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

