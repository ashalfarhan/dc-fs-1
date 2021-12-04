import 'dotenv/config'

type ENV = 'production' | 'development'

const configKeys = {
  development: {
    DB_NAME: process.env.DB_NAME || 'test',
    DB_USER: process.env.DB_USER || 'test',
    DB_PASSWORD: process.env.DB_PASSWORD || 'test',
    DB_HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.PORT || '4000',
  },
  production: {
    DB_NAME: process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_HOST: process.env.DB_HOST!,
    PORT: process.env.PORT!,
  },
} as const

export function conf(key: keyof typeof configKeys[ENV], override?: string) {
  const env = (process.env.NODE_ENV || 'development') as ENV
  return override ?? configKeys[env][key]
}

export const isProd = process.env.NODE_ENV === 'production'
