import { conf, isProd } from '../config'
import { Image } from '../entity/Image.entity'

let databaseOptions: Record<string, any> = {
  username: conf('DB_USER'),
  password: conf('DB_PASSWORD'),
  database: conf('DB_NAME'),
  host: 'localhost',
  port: 5432,
  entities: [Image],
  logging: isProd,
  synchronize: !isProd,
}

if (isProd) {
  databaseOptions = {
    ...databaseOptions,
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  }
}

export default databaseOptions
