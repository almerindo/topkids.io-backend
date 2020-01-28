'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async index ({ request }) {
    const user = await User
      .query()
      .with('giftcards')
      .with('file')
      .fetch()

    return user
  }
}

module.exports = UserController
