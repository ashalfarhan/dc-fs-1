import 'reflect-metadata'
import express from 'express'
import { createConnection, Connection } from 'typeorm'
import { conf } from './config'
import { createRouter } from './router'
import { join } from 'path'
import { Image } from './entity/Image.entity'

const app = express()

let connection: Connection

async function main() {
  console.log('Booting up 🚀')
  const port = conf('PORT')

  try {
    connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: conf('DB_USER'),
      password: conf('DB_PASSWORD'),
      database: conf('DB_NAME'),
      entities: [Image],
      logging: process.env.NODE_ENV === 'production',
      synchronize: process.env.NODE_ENV !== 'production',
    })

    app.use('/api', createRouter(connection))

    if (process.env.NODE_ENV === 'production') {
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
