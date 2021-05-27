'use strict'
const Esp = use('App/Models/Especialidade')

class EspecialidadeController {

  async store({ request, response }) {
    const user_data = request.all();

    const { id } = request.only('id')
    const { title } = request.only('title');
    const user = await Esp.create(user_data);


    await user.save()

    return response.status(201).send({ title, id });

  }

  async show_esp() {
// hospital specialty
    const esp = await Esp.query()
      .table('especialidade')
      .select('esp_id', ' hospital.hospital_name')
      .innerJoin('hospital ', 'hospital.hospital.id ', 'especialidade.hospital_id')
      .fetch()

    return esp
  }


}

module.exports = EspecialidadeController
