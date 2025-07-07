import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 100,
    type: 'varchar',
  })
  name!: string

  @Column({
    length: 100,
    type: 'varchar',
  })
  email!: string

  @Column({ type: 'varchar' })
  passwordHash!: string

  @CreateDateColumn({ type: 'date' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt!: Date
}
