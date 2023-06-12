import { User } from '../../../../accounts/infra/typeorm/entities/User'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { ExpanseTypes } from './ExpanseTypes'

@Entity('expanses')
class Expanses {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amountSpent: number

  @Column()
  expenseTypeId: string

  @ManyToOne(() => ExpanseTypes)
  @JoinColumn({ name: 'expenseTypeId' })
  expanseTypes: ExpanseTypes

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

export { Expanses }
