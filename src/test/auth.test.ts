import 'reflect-metadata'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import app from '@/app'
import { AppDataSource } from '@/data-source'
import { User } from '../entity/User'
import { hashPassword } from '../utils/bcrypt'

let testUser: User
let accessToken: string
let refreshToken: string

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  await AppDataSource.synchronize(true)

  const repo = AppDataSource.getRepository(User)
  const hashedPassword = await hashPassword('123456')

  testUser = repo.create({
    name: 'test',
    email: 'test@example.com',
    passwordHash: hashedPassword,
  })

  testUser = await repo.save(testUser)
})

afterAll(async () => {
  await AppDataSource.destroy()
})

describe('Test User API', () => {
  it('should have test user available', async () => {
    expect(testUser).toBeDefined()
    expect(testUser.email).toBe('test@example.com')
  })
})

describe('Auth routes', () => {
  // test register
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/sign-up').send({
      name: 'testuser',
      email: 'testuser@example.com',
      password: '1234qweR',
    })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('User registered successfully')
  })

  // test login
  it('should login and return access and refresh token', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'testuser@example.com',
      password: '1234qweR',
    })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('accessToken')
    expect(response.body.data).toHaveProperty('refreshToken')
    accessToken = response.body.data.accessToken
    refreshToken = response.body.data.refreshToken
  })

  //test fetch me
  it('should access protected route with valid access token', async () => {
    const response = await request(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('API response successful')
  })

  //test fetch me with invalid token
  it('should return 401 when accessing protected route with valid invalid token', async () => {
    const response = await request(app)
      .get('/api/user/me')
      .set('Authorization', 'Bearer invalid')

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })
})
