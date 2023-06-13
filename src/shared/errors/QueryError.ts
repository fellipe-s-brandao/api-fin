/* eslint-disable no-extra-boolean-cast */
export class QueryError {
  public readonly message: string

  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
  }
}
