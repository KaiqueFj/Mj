'use strict'

const Doc = use('App/Models/Doctor')


class DoctorController {

    async store({ request, response, auth }) {
        const user_data = request.all();
        const  {id} = request.only('id')
        const { name } = request.only('name');
        const user = await Doc.create(user_data);

        await user.save()
    
        return response.status(201).send({ id, name });
    
      }
    
}

module.exports = DoctorController
