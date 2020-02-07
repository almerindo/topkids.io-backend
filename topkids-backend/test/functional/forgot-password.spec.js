'use strict'

const { test, trait } = use('Test/Suite')('ForgotPasswordController')
const Factory = use('Factory')
const Mail = use('Mail')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve enviar mail de recuperacao a senha', async ({ assert, client }) => {
  Mail.fake()

  const user = await Factory.model('App/Models/User').create()

  await client.post('/passwords').send(
    {
      email: user.email,
      redirect_url: 'http://topkids.io/password_reset'
    }
  ).end()
  const mail = Mail.pullRecent()
  assert.equal(mail.message.to[0].address, user.email)
  assert.equal(mail.message.subject, 'Recuperação de Senha')

  Mail.restore()
})

test('Reseta a senha usando o token', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client.put('/passwords').send(
    { token: user.token, password: 'new password' }).end()

  await user.reload()

  response.assertStatus(204)
  assert.isTrue(await user.verify('new password'))
})
