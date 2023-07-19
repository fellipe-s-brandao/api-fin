export interface ICreateProfitDTO {
  id?: string
  name: string
  description: string
  profitAmount: number
  profitTypeId: string
  profitDate: Date
  userId: string
}

export interface IListProfitDTO {
  name?: string
  profitTypeId?: string
  profitDateStart?: Date
  profitDateEnd?: Date
  offset?: string
  limit?: string
}

export interface IGetTotalizersDTO {
  week?: number
  month?: number
}
