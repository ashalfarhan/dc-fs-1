import 'reflect-metadata'
import express from 'express'
import { createConnection, Connection } from 'typeorm'
import { conf } from './config'
import { createRouter } from './router'
import { join } from 'path'
import { Image } from './entity/Image.entity'

const app = express()

const isProd = process.env.NODE_ENV === 'production'

let connectionConfig: Record<string, any> = {
  username: conf('DB_USER'),
  password: conf('DB_PASSWORD'),
  host: 'localhost',
  port: 5432,
}

if (isProd) {
  connectionConfig = {
    url: process.env.DATABASE_URL,
  }
}

let connection: Connection

async function main() {
  console.log('Booting up 🚀')
  const port = conf('PORT')

  try {
    connection = await createConnection({
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: conf('DB_USER'),
      // password: conf('DB_PASSWORD'),
      // database: conf('DB_NAME'),
      entities: [Image],
      logging: isProd,
      synchronize: !isProd,
      ...connectionConfig,
    })

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
