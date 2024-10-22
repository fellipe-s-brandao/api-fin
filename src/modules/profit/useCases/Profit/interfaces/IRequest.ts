export interface IResquestCreateProfit {
  id?: string
  name: string
  description: string
  profitAmount: number
  profitTypeId: string
  profitDate: Date
  userId: string
}

export interface IRequestListProfit {
  name?: string
  profitTypeId?: string
  profitDateStart?: Date
  profitDateEnd?: Date
  offset?: string
  limit?: string
}
