import { ErrorRequestHandler } from 'express'

export const catchAll: ErrorRequestHandler = (error, _req, res) => {
  if (error instanceof Error) {
    res.status(500).json({ error })
    return
  }
  res.status(500).json({
    error: Error('Interal Server Error'),
  })
}
