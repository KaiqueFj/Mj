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
Route.post('login/a', 'SessionController.login');

Route.post('event/new', 'UserController.event').middleware('auth')
Route.post('event/ap', 'UserController.index').middleware('auth')//route para relacionar os eventos com usuarios
//Route.get('events/list/date', 'UserController.show') // route para listar os eventos pela sua data de criacao

