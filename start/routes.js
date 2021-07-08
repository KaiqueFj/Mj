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

const { route } = require('@adonisjs/framework/src/Route/Manager');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route') //usa route para fazer a interação


// Registro e Login de Usuário
Route.post('users/register', 'UserController.store');
Route.post('users/login', 'SessionController.login');
Route.get('users/home', 'SessionController.index');


//registro e login de hospital
Route.post('hospital/register', 'HospitalController.store');
Route.post('hospital/login', 'HospitalController.login');
Route.get('hospital/home', 'SessionController.index');

//registro e login de doctor
Route.post('doctor/register', 'DoctorController.register')
Route.post('doctor/login', 'SessionController.login')


// funções de update e recuperacação de password
Route.put('password/update/:id', 'PasswordController.update');
Route.post('password/recover', 'PasswordController.recover')

// Criação da tabela para remedio
Route.post('create/medicine', 'MedicineController.store').middleware('auth')
Route.get('show/medicine', 'MedicineController.show').middleware('auth')

//adicionar consultas e fazer a busca delas
Route.post('create/schedule', 'ConsultaController.schedule').middleware('auth')
Route.get('show/schedule', 'ConsultaController.show').middleware('auth')
Route.post('consulta/register', 'ConsultaController.store')
Route.get('consulta/show', 'ConsultaController.show')

//query db to retrieve all hospitals and doctors that work there
Route.get('hospital/show', 'HospitalController.hosp')
Route.get('hospital_doc/show', 'HospitalController.hosp_doctor')

//login with ally services
Route.get('/google/login', 'SessionController.redirect');
Route.get('/authenticated/google', 'SessionController.callback');

//adiciona as especialidades
Route.post('espc/register', 'EspecialidadeController.store')

Route.post('reminder/register', 'ReminderController.store')
Route.get('reminder/show', 'ReminderController.store')












