'use strict'

const { test, trait } = use('Test/Suite')('User Registration')

trait('Test/ApiClient')

test('Deve criar um usuário', async ({ client }) => {
  const data = {
    username: 'almerindo',
    email: 'almerindo.rehem@gmail.com',
    password: '1234567890'
  }

  const response = await client.post('/users')
    .send(data)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'almerindo',
    email: 'almerindo.rehem@gmail.com'
  })
})

test('Deve Listar usuarios', async ({ client }) => {
  const response = await client.get('/users')
    .end()

  response.assertStatus(200)

  response.assertJSONSubset([{
    id: 1,
    username: 'almerindo',
    email: 'almerindo.rehem@gmail.com'
  }])
})
