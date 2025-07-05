import 'reflect-metadata'
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
    console.log('Inserting a new user into the database...')
    const user = new User()
    user.name = 'Timber'

    await AppDataSource.manager.save(user)
    console.log('Saved a new user with id: ' + user.id)

    console.log('Loading users from the database...')
    const users = await AppDataSource.manager.find(User)
    console.log('Loaded users: ', users)

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    )
  })
  .catch((error) => console.log(error))
