import { DataSource } from 'typeorm'
import { User } from './entity/User'
import ENV from './config/env.config'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DATABASE_HOST,
  port: ENV.DATABASE_PORT,
  username: ENV.DATABASE_USER,
  password: ENV.DATABASE_PASSWORD,
  database: ENV.DATABASE_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize()
  .then(async () => {
    const existingUser = await AppDataSource.manager.findOneBy(User, {
      email: 'timber@example.com',
    })

    if (!existingUser) {
      console.log('Inserting a new user into the database...')
      const user = new User()
      user.name = 'Timber'
      user.email = 'timber@example.com'
      user.passwordHash = '123456'
      user.createdAt = new Date()
      user.updatedAt = new Date()
      await AppDataSource.manager.save(user)
      console.log('Saved a new user with id: ' + user.id)
    } else {
      console.log('User already exists:', existingUser)
    }
  })
  .catch((error) => console.log(error))
