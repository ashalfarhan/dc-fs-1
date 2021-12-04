import 'reflect-metadata'
import express from 'express'
import { createConnection, Connection } from 'typeorm'
import { conf, isProd } from './config'
import { createRouter } from './router'
import { join } from 'path'
import limiter from 'express-rate-limit'
import databaseOptions from './database/config'

const app = express()

let connection: Connection

async function main() {
  console.log('Booting up 🚀')
  const port = conf('PORT')

  try {
    connection = await createConnection({ ...databaseOptions, type: 'postgres' })
    app.use(limiter({ windowMs: 60 * 60 * 100, max: 2 }))
    app.use('/api', createRouter(connection))

    if (isProd) {
      app.use(express.static(join(__dirname, '..', 'dist/client')))
    }

    app.listen(port, () => {
      console.log('Listening on %s', port)
    })
  } catch (error) {
    console.log('Shutting down 🌠')
    connection?.close()
    console.log(error)
    console.log(error.message)
    process.exit(0)
  }
}

main()
