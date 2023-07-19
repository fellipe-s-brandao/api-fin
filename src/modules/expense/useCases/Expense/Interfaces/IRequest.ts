export interface IResquestCreateExpense {
  id?: string
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
}

export interface IRequestListExpense {
  name?: string
  expenseTypeId?: string
  expenseDateStart?: Date
  expenseDateEnd?: Date
  offset?: string
  limit?: string
}
