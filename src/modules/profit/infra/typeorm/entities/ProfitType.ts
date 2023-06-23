import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../../../accounts/infra/typeorm/entities/User'

@Entity('profitType')
class ProfitType {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { ProfitType }
