
const pg = require('./util/MundipagG')

class PaymentGateway {
  constructor () {
    // mundipagg.Configuration.basicAuthUserName = 'sk_test_8q2ZOQRCjcQmLaBo'
    pg.print()
  }

  async store ({ request, response }) {
    const result = await pg.createCustomer(
      {
        name: 'Almerindo Rehem', email: 'almerindo.rehem@gmail.com'
      }
    )
    response.status(200).send({ result })
  }
}

module.exports = PaymentGateway
