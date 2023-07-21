import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  if (parseInt(process.env.PRODUCAO)) {
    return createConnection(
      Object.assign(defaultOptions, {
        database: defaultOptions.database,
      }),
    )
  }

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.DOCKER_SERVICE_PG,
      database: defaultOptions.database,
    }),
  )
}
