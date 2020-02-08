'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Giftcard = use('App/Models/Giftcard')
const File = use('App/Models/File')

const Event = use('Event')

/**
 * Resourceful controller for interacting with giftcards
 */
class GiftcardController {
  /**
   * Show a list of all giftcards.
   * GET giftcards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, request, response, view }) {
    const gifitcards = await auth.user.giftcards().fetch()

    return gifitcards
  }

  /**
   * Create/save a new giftcard.
   * POST giftcards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['name', 'description', 'price'])

      const giftcard = await auth.user.giftcards().create({ ...data, user_id: auth.user.id })
      // Event.fire('new::giftCard', giftcard)

      return giftcard
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao cadastrar Giftcard' } })
    }
  }

  /**
   * Display a single giftcard.
   * GET giftcards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, response }) {
    try {
      const gifitcard = await auth.user.giftcards()
        .where({ id: params.id })
        .first()

      // await gifitcard.load('user')
      // await gifitcard.load('file')

      return gifitcard
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao Exibir Giftcard' } })
    }
  }

  /**
   * Update giftcard details.
   * PUT or PATCH giftcards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.only(['name', 'description', 'price', 'file_id'])

      if (data.file_id) {
        await File.findOrFail(data.file_id)
      }

      const gifitcard = await auth.user.giftcards()
        .where({ id: params.id })
        .first()

      gifitcard.merge(data)

      await gifitcard.save()

      return gifitcard
    } catch (error) {
      return response
        .status(error.status)
        .send({
          error: {
            message: 'Erro ao Atualizar Giftcard',
            detail: error.message
          }
        })
    }
  }

  /**
   * Delete a giftcard with id.
   * DELETE giftcards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    try {
      const gifitcard = await auth.user.giftcards()
        .where({ id: params.id })
        .first()

      await gifitcard.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao apagar giftcard' } })
    }
  }
}

module.exports = GiftcardController
