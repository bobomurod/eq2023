'use strict';

import Hapi, { Request } from '@hapi/hapi'
import { Server } from '@hapi/hapi'

export let server: Server;

export const init = async function(): Promise<Server>
{
  server = Hapi.server({
    port: process.env.PORT || 44344,
    host: '0.0.0.0'
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: index
  })

  return server;
}

export const start = async function(): Promise<void>
{
  console.log(`Listening on ${server.settings.port}`)
  return server.start();
}

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection')
  console.error(err)
  process.exit(1);
})

function index(request: Request): string {
  console.log('Processing request', request.info.id);
  return 'Service running';
}
