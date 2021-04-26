'use strict'
const Esp = use('App/Models/Especialidade')

class EspecialidadeController {

    async store({ request, response }) {
        const user_data = request.all();
      
        const  {id} = request.only('id')
        const { title } = request.only('title');
        const user = await Esp.create(user_data);
    
        
        await user.save()
    
        return response.status(201).send({ title,id  });
    
      }
    
}

module.exports = EspecialidadeController
