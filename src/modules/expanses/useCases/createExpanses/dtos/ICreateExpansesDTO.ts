interface ICreateExpansesDTO {
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
  createAt: Date
}

export { ICreateExpansesDTO }
