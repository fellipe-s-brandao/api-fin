import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '@modules/accounts/infra/typeorm/entities/User'

@Entity('profitTypes')
class ProfitTypes {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => User)
  user: User

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { ProfitTypes }
