'use strict'

const { test, trait } = use('Test/Suite')('Giftcard')

const Factory = use('Factory')
const User = use('App/Models/User')
const Helpers = use('Helpers')

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')
trait('DatabaseTransactions')

test('Deve cadastrar giftcard', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const data = {
    name: 'Bundle de 5000 VBucks',
    description: '5000 VBUCKS para Quem tem XBoX',
    price: 12345
  }
  const response = await client
    .post('/giftcards')
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  assert.isDefined(response.body.name)
})

test('Deve listar giftcards', async ({ client }) => {
  const giftcard = await Factory.model('App/Models/Giftcard').create()
  const user = await User.findByOrFail('id', giftcard.user_id)

  const response = await client
    .get('/giftcards')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
})

test('Deve listar giftcards por ID', async ({ client }) => {
  const giftcard = await Factory.model('App/Models/Giftcard').create()
  const user = await User.findByOrFail('id', giftcard.user_id)

  const response = await client
    .get(`/giftcards/${giftcard.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
})

test('Deve atualizar giftcards', async ({ client }) => {
  const giftcard = await Factory.model('App/Models/Giftcard').create()

  const user = await User.findByOrFail('id', giftcard.user_id)

  let response = await client
    .post('/files')
    .loginVia(user, 'jwt')
    .attach('file', Helpers.tmpPath('test/giftcard.jpg'))
    .end()

  response.assertStatus(200)

  const fileId = response.id

  response = await client
    .put(`/giftcards/${giftcard.id}`)
    .send(
      {
        name: 'Bundle de 2000 VBssucks',
        description: 'Giftcard alterado',
        price: 9999,
        file_id: fileId
      }
    )
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
})

test('Deve apagar giftcards', async ({ client }) => {
  const giftcard = await Factory.model('App/Models/Giftcard').create()
  const user = await User.findByOrFail('id', giftcard.user_id)

  const response = await client
    .delete(`/giftcards/${giftcard.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
})
