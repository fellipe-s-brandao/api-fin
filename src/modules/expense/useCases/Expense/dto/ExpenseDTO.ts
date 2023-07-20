export interface ICreateExpenseDTO {
  id?: string
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
}

export interface IListExpenseDTO {
  name?: string
  expenseTypeId?: string
  expenseDateStart?: Date
  expenseDateEnd?: Date
  offset?: string
  limit?: string
}

export interface IGetTotalizersDTO {
  expenseDateStart?: string
  expenseDateEnd?: string
  month?: string
}
