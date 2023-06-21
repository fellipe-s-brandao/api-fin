import { User } from '@modules/accounts/infra/typeorm/entities/User'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'

@Entity()
export class ProfitTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => User)
  user: User

  @CreateDateColumn()
  createdAt: Date
}
