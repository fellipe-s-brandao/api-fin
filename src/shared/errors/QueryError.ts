export class QueryError {
  public readonly message: string

  public readonly statusCode: number

  constructor(
    message = 'Sistema indisponível, entre em contato com o suporte!',
    statusCode = 500,
  ) {
    this.message = message
    this.statusCode = statusCode
  }
}
