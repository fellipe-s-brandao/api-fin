interface ICreateExpensesDTO {
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
}

export { ICreateExpensesDTO }
