import { Router } from 'express'
import { Connection } from 'typeorm'
import { Image } from './entity/Image.entity'
import multer from 'multer'
import { extname } from 'path'
import { Buffer } from 'buffer'

const upload = multer({
  limits: { fileSize: 1000000 },
})

export const createRouter = (connection: Connection) => {
  const router = Router()
  const imagesRepo = connection.getRepository(Image)

  router.post('/images', upload.single('file'), async (req, res, next) => {
    try {
      if (!req.file) {
        res.sendStatus(400)
        return
      }
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
        res.sendStatus(404)
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
