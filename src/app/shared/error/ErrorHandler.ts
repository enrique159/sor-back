import MongoDBErrorCodes from '../enums/MongoDBErrorCodes'
import HttpStatusCode from '../enums/httpStatusCode'
import Exception from './Exception'
import Warning from './Warning'
import ErrorCode from './errorCode'

export class ErrorHandler {
  constructor( public readonly error ) { }

  public handle(): Error {
    if (this.error.code === MongoDBErrorCodes.DUPLICATE_KEY)
      throw new Warning(HttpStatusCode.CONFLICT, ErrorCode.ERR0007)
    else if (this.error.errors?.name?.kind === 'required')
      throw new Warning(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0008)
    else
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
  }
}