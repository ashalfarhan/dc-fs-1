import 'reflect-metadata'
import express from 'express'
import { createConnection, Connection } from 'typeorm'
import { conf } from './config'
import { createRouter } from './router'
import { catchAll } from './utils/error'

const app = express()

let connection: Connection

async function main() {
  try {
    console.log('Booting up 🚀')
    connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: conf('DB_USER'),
      password: conf('DB_PASSWORD'),
      database: conf('DB_NAME'),
      entities: ['src/entity/*.entity.ts'],
      logging: process.env.NODE_ENV === 'production',
      synchronize: process.env.NODE_ENV !== 'production',
    })

    const port = conf('PORT')

    app.use('/api', createRouter(connection))
    app.use(catchAll)
    app.listen(port, () => {
      console.log('Listening on %s', port)
    })
  } catch (error) {
    console.log('Shutting down 🌠')
    connection?.close()
    console.log(error.message)
    process.exit(0)
  }
}

main()
