interface ICreateUserDTO {
  name: string
  username: string
  email: string
  phone: string
  password: string
  birthDate: Date
  gender: number
  customGender?: string
  avatar?: string
}

export { ICreateUserDTO }
