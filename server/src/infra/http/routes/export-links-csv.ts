import { exportLinksCSV } from '@/app/functions/export-links-csv'
import { getAllLinks } from '@/app/functions/get-all-links'
import { unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const exportLinksCSVRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/export-csv',
    {
      schema: {
        summary: 'Export all links to csv',
        tags: ['links'],
        response: {
          200: z.object({
            fileUrl: z.url().describe('Link file csv'),
          })
        }
      }
    },
    async (request, reply) => {
      const result = await exportLinksCSV();

      const allLinks = unwrapEither(result)

      return reply.status(200).send(allLinks)
    }
  )
}