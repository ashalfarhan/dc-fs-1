import { RequestHandler } from 'express'
import multer from 'multer'
const upload = multer({
  limits: { fileSize: 1000000 },
}).single('file')

export const uploadMiddleware: RequestHandler = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err.message })
      return
    } else if (err instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error' })
      return
    }
    next()
  })
}
