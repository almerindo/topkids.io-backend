'use strict'
const crypto = require('crypto')

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '1234567890',
    token: crypto.randomBytes(10).toString('hex'),
    ...data
  }
})

Factory.blueprint('App/Models/Giftcard', async (faker, i, data) => {
  const user = await Factory.model('App/Models/User').create({
    password: '1234567890'
  })
  return {
    name: faker.sentence(),
    description: faker.sentence(),
    price: '123456',
    user_id: user.id
  }
})
