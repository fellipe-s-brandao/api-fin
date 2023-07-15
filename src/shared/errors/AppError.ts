export class AppError {
  public readonly message: string

  public readonly statusCode: number

  constructor(message: string, statusCode = 400, error?: Error) {
    this.message = parseInt(process.env.PRODUCAO) ? message : error.stack
    this.statusCode = statusCode
  }
}
