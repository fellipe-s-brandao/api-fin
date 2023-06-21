import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { ProfitTypes } from './ProfitTypes'

@Entity('profits')
class Profit {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  profitAmount: number

  @ManyToOne(() => ProfitTypes)
  profitType: ProfitTypes

  @CreateDateColumn()
  profitDate: Date

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

export { Profit }
