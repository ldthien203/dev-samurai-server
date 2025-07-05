import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 100,
  })
  name!: string

  @Column({
    length: 100,
  })
  email!: string

  @Column()
  passwordHash!: string

  @Column()
  createdAt!: Date

  @Column()
  updatedAt!: Date
}
