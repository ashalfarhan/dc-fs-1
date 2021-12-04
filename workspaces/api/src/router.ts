import { Router } from 'express'
import { Connection } from 'typeorm'
import { Image } from './entity/Image.entity'
import { extname } from 'path'
import { Buffer } from 'buffer'
import { uploadMiddleware } from './middlewares/uploadMiddleware'
import limiter from 'express-rate-limit'

export const createRouter = (connection: Connection) => {
  const router = Router()
  const imagesRepo = connection.getRepository(Image)

  router.use(limiter({ windowMs: 60 * 60 * 100 }))

  router.post('/images', uploadMiddleware, async (req, res, next) => {
    if (!req.file) {
      res.status(400).json({
        message: 'Please include a file',
      })
      return
    }
    try {
      /**
       * Saving to local directory
       */
      // const result = await writeFile(
      //   join(__dirname, '..', 'uploads', new Date().toDateString().concat(extname(req.file.originalname))),
      //   req.file.buffer
      // )
      /**
       * Saving to database
       */
      const { createdAt, fileName, fileType, id } = await imagesRepo
        .create({
          buffer: req.file.buffer,
          fileType: req.file.mimetype,
          base64Str: req.file.buffer.toString('base64'),
          fileName: new Date().toISOString().concat(extname(req.file.originalname)),
        })
        .save()
      res.json({ fileName, fileType, createdAt, id })
    } catch (error) {
      next('router')
    }
  })

  router.get('/images/:fileName', async (req, res, next) => {
    try {
      const result = await imagesRepo.findOne({ where: { fileName: req.params.fileName } })
      if (!result) {
        res.status(404).json({
          message: 'No image found',
        })
        return
      }
      res.contentType(result.fileType)
      res.send(Buffer.from(result.base64Str, 'base64'))
    } catch (error) {
      next('router')
    }
  })

  return router
}
