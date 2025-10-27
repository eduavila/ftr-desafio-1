import { deleteLink } from '@/app/functions/delete-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/links/:id',
    {
      schema: {
        params: z.object({
          id: z.uuidv7().describe('Id of the created link'),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      await deleteLink({ id });

      return;
    }
  )
}