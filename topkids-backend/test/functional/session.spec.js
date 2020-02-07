'use strict'

const { test, trait } = use('Test/Suite')('Session Login')

trait('DatabaseTransactions')
trait('Test/ApiClient')
const Factory = use('Factory')

test('Deve se Logar', async ({ client }) => {
  await Factory.model('App/Models/User').create(
    {
      email: 'almerindo.rehem@gmail.com',
      password: '1234567890'
    }
  )

  const data = {
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
