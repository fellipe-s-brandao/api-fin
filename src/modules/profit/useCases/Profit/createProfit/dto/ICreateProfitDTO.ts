interface ICreateProfitDTO {
  id?: string
  name: string
  description: string
  profitAmount: number
  profitTypeId: string
  profitDate: Date
  userId: string
}

export { ICreateProfitDTO }