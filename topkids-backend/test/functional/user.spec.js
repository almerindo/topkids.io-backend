'use strict'

const { test, trait } = use('Test/Suite')('Post')

trait('Test/ApiClient')

test('Deve criar um usuário', async ({ client }) => {
  const data = {
    username: 'almerindo',
    email: 'almerindo.rehem@gmail.com',
    password: '1234567890'
  }

  const response = await client.get('/users')
    .send(data)
    .end()

  response.assertStatus(200)
})
