'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File')
const Helpers = use('Helpers')
/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })
      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      // console.log(`auth.user : ${auth.user.id}`)

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        user_id: auth.user.id
      })

      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async show ({ params, response, auth }) {
    try {
      const file = await File.findOrFail(params.id)

      if (file.user_id !== auth.user.id) {
        return response
          .status(401)
          .send({
            error: {
              message: 'Arquivo Não pertence ao usuário logado',
              detail: `file.user_id: ${file.user_id}  !== auth.user.id: ${auth.user.id}`
            }
          })
      }

      return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao exibir arquivo' } })
    }
  }
}

module.exports = FileController
