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
    unique: true,
  })
  email!: string

  @Column({ type: 'varchar' })
  passwordHash!: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date
}
