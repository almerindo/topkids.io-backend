'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('users', 'UserController.store')
Route.get('users', 'UserController.index') // Somente Admin

Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.group(() => {
  Route.get('files/:id', 'FileController.show')
  Route.post('files', 'FileController.store')

  Route.resource('giftcards', 'GiftcardController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('payments', 'PaymentGateway').apiOnly()
}).middleware('auth')
