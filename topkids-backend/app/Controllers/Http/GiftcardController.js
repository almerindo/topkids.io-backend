'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Giftcard = use('App/Models/Giftcard')

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
  async index ({ request, response, view }) {
    const gifitcards = await Giftcard
      .query()
      .with('user')
      .fetch()

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

      const giftcard = await Giftcard.create({ ...data, user_id: auth.user.id })
      Event.fire('new::giftCard', giftcard)

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
  async show ({ params, response }) {
    try {
      const gifitcard = await Giftcard.findOrFail(params.id)

      await gifitcard.load('user')
      await gifitcard.load('file')

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
  async update ({ params, request, response }) {
    try {
      const gifitcard = await Giftcard.findOrFail(params.id)
      const data = request.only(['name', 'description', 'price', 'file_id'])

      gifitcard.merge(data)
      await gifitcard.save()
      return gifitcard
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao Atualizar Giftcard' } })
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
  async destroy ({ params, response }) {
    try {
      const gifitcard = await Giftcard.findOrFail(params.id)

      await gifitcard.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao apagar giftcard' } })
    }
  }
}

module.exports = GiftcardController
