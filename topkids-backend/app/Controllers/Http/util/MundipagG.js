const mundipagg = require('mundipagg-nodejs')

class MundipagG {
  constructor () {
    mundipagg.Configuration.basicAuthUserName = 'sk_test_8q2ZOQRCjcQmLaBo'
  }

  /**
   * Cria o Customer na base da MundiPagG
   * @param {name, email, password} clientData
   * @return ID or Error
   */
  async createCustomer (clientData) {
    const request = new mundipagg.CreateCustomerRequest()
    request.name = clientData.name
    request.email = clientData.email

    const customersController = mundipagg.CustomersController
    const customer = await customersController.createCustomer(request)
    return customer
  }

  print () {
    console.log('Imprimir')
  }
}

module.exports = new MundipagG()
