import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'

export interface IResponseListProfit {
  profits: Profit[]
  countProfits: number
}
