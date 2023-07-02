interface ICreateExpenseDTO {
  id?: string
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
}

export { ICreateExpenseDTO }
