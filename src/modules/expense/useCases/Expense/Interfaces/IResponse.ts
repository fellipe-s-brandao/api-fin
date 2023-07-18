import { Expense } from '@modules/expense/infra/typeorm/entities/Expense'

export interface IResponseListExpense {
  expenses: Expense[]
  countExpenses: number
}
