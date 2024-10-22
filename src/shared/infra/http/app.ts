import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { router } from './routes'

import cors from 'cors'

import '@shared/container'

import createConnection from '@shared/infra/typeorm'
import { QueryError } from '@shared/errors/QueryError'
import { AppError } from '@shared/errors/AppError'

process.env.TZ = 'America/Sao_Paulo'
createConnection()

const app = express()
app.use(cors())
app.use(express.json())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError || err instanceof QueryError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

export { app }
