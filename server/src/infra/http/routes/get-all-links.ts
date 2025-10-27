import { getAllLinks } from '@/app/functions/get-all-links'
import { unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getAllLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    async (request, reply) => {
      const result = await getAllLinks();

      const allLinks = unwrapEither(result)

      return reply.status(200).send(allLinks)
    }
  )
}