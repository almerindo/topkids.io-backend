'use strict'

const { test, trait } = use('Test/Suite')('Giftcard')

const Factory = use('Factory')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')
trait('DatabaseTransactions')

test('Deve cadastrar giftcard', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const data = {
    name: 'Bundle de 5000 VBssucks',
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
