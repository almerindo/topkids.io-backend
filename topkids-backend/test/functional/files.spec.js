'use strict'
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { test, trait } = use('Test/Suite')('Files Upload and Show')

const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')
trait('DatabaseTransactions')

const Helpers = use('Helpers')

test('Deve permitir upload de arquivo', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/files')
    .loginVia(user, 'jwt')
    .attach('file', Helpers.tmpPath('test/giftcard.jpg'))
    .end()

  response.assertStatus(200)
})

test('Deve retornar um arquivo', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  let response = await client
    .post('/files')
    .loginVia(user, 'jwt')
    .attach('file', Helpers.tmpPath('test/giftcard.jpg'))
    .end()

  response.assertStatus(200)
  const { id } = response.body

  response = await client
    .get(`/files/${id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
})
