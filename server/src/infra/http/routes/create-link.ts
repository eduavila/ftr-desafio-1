import { createLink } from '@/app/functions/create-link'
import { ShortUrlAlreadyExists } from '@/app/functions/errors/exist-short-regiter'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
     {
        schema: {
            body: z.object({
                originalUrl: z.url().describe('URL original'),
                shortCode: z.string().min(3).max(40).describe('URL encurtada')
            }),
            response: {
                201: z.object({
                    id: z.uuidv7().describe('Id of the created link'),
                    originalUrl: z.url().describe('URL Original'),
                    shortCode: z.string().describe('URL encurtada.')
                }),

                400: z.object({
                    message: z.string().describe('Error message')
                })
            }
        }
    },
    async (request, reply) => {
      const result = await createLink({ originalUrl: request.body.originalUrl, shortCode: request.body.shortCode });

      if (isRight(result)) {
        const { id,originalUrl, shortCode } = unwrapEither(result)

        return reply.status(201).send({ id, originalUrl, shortCode })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case ShortUrlAlreadyExists.name:
          return reply.status(400).send({ message: error.message })
      }
    }
  )
}