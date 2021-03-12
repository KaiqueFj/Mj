'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route') //usa route para fazer a interação

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('users', 'UserController.store'); // adiciona o usuario ao banco de dados e salva suas informações

Route.group(() => {
  Route.put('users/:id', 'UserController.update') //faz o update da senha e username do usuario
}).middleware(['auth']);

Route.post('/login', 'UserController.login')

Route.post('users/forgotPassword', 'UserController.recover') ;// serve para recuperar a senha que foi esquecida, mandando um email para a conta criada

Route.put('users/forgotPassword/:token/:email', 'UserController.update') //route criada para o link de recuperação de senha

Route.post('events/new', 'UserController.event')//route para relacionar os eventos com usuarios

Route.get('events/list/date', 'UserController.show') // route para listar os eventos pela sua data de criacao

Route.delete('events/:id/delete', 'UserController.destroy')// deleta o evento que o usuario desejar



