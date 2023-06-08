import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @Column({ type: 'timestamp' })
  birthDate: Date

  @Column({ type: 'smallint' })
  gender: number

  @Column({ default: null })
  customGender: string

  @Column({ default: null })
  avatar: string

  @Column({ default: null })
  passwordResetToken: string

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }
