import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { User } from './User'
import { v4 as uuidV4 } from 'uuid'

@Entity('userTokens')
class UserTokens {
  @PrimaryColumn()
  id: string

  @Column()
  refreshToken: string

  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  expiresDate: Date

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { UserTokens }
