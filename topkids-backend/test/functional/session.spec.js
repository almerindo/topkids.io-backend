'use strict'

const { test, trait } = use('Test/Suite')('Session Login')

trait('DatabaseTransactions')
trait('Test/ApiClient')
const User = use('App/Models/User')

test('Deve se Logar', async ({ client }) => {
  let data = {
    username: 'almerindo',
    email: 'almerindo.rehem@gmail.com',
    password: '1234567890'
  }

  await User.create(data)

  data = {
    email: 'almerindo.rehem@gmail.com',
    password: '1234567890'
  }

  const response = await client.post('/sessions')
    .send(data)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer'
  })
})
