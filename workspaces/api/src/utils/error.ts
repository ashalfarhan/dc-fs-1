import { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'

export const catchAll: ErrorRequestHandler = (error, _req, res) => {
  console.log(_req, res)
  if (error instanceof MulterError) {
    res.status(400).json({
      error,
    })
    return
  }
  res.status(500).json({
    error: Error('Interal Server Error'),
  })
}
