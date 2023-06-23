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
import { ProfitType } from './ProfitType'

@Entity('profit')
class Profit {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  profitAmount: number

  @Column()
  profitTypeId: string

  @ManyToOne(() => ProfitType)
  @JoinColumn({ name: 'profitTypeId' })
  profitType: ProfitType

  @CreateDateColumn()
  profitDate: Date

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

export { Profit }
