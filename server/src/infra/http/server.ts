import { env } from '@/env';
import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify'

import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link';
import { getAllLinksRoute } from './routes/get-all-links';
import { deleteLinkRoute } from './routes/delete-link';
import { getLinkByShortCodeRoute } from './routes/get-link-by-shortCode';
import { exportLinksCSVRoute } from './routes/export-links-csv';

const server = fastify()

server.register(fastifyCors, { origin: '*',methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] })

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    console.log(error.validation);
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})


server.register(exportLinksCSVRoute)

server.register(deleteLinkRoute)
server.register(getAllLinksRoute)
server.register(createLinkRoute)
server.register(getLinkByShortCodeRoute)


server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})