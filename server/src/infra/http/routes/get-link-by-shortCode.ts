import { LinkNotFound } from '@/app/functions/errors/link-not-found'
import { getLinkByShortCode } from '@/app/functions/get-link-by-shortCode'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinkByShortCodeRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:shortCode',
    {
      schema: {
        summary: 'Select link by short URL',
        tags: ['links'],
        params: z.object({
          shortCode: z.string().describe('Short URL')
        }),
        response: {
          200: z.object({
            id: z.uuidv7().describe('Id'),
            originalUrl: z.url().describe('Original URL'),
            shortCode: z.string().describe('Short URL'),
            visitCount: z.coerce.number().describe('Number of visited'),
            createdAt: z.coerce.date().describe('Creation date')
          }),

          404: z.object({
            message: z.string().describe('Link not found')
          })
        }
      }
    },
    async (request, reply) => {
      const { shortCode } = request.params;

      const result = await getLinkByShortCode({ shortCode });

      if (isRight(result)) {
        const { id, originalUrl, shortCode, visitCount, createdAt } = unwrapEither(result)

        return reply.status(200).send({ id, originalUrl, shortCode, visitCount, createdAt })
      }
      
      const error = unwrapEither(result)
        switch (error.constructor.name) {
          case LinkNotFound.name:
            return reply.status(404).send({ message: error.message })
        }
    }
  )
}