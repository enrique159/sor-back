import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import HttpStatusCode from '@shared/enums/httpStatusCode.js'
import { logger } from '@shared/log/logger.js'
import ErrorCode from '@shared/error/errorCode.js'

export default class VerifyAdminMiddleware {
  async execute(req: Request, res: Response, next: NextFunction) {
    //const token = req.cookies.JSESSIONID;
    const token = req.headers['authorization']
    if (!token) {
      logger({ HttpType: req.method, route: 'None', useremail: 'NA', error: 'Unauthorized', success: false })
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: [ErrorCode.ERR0018] })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          logger({ HttpType: req.method, route: 'None', useremail: 'NA', error: 'Token expired', success: false })
          return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Token expired' })
        }
        logger({ HttpType: req.method, route: 'None', useremail: 'NA', error: err.message, success: false })
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' })
      }
      next()
    })
  }
}