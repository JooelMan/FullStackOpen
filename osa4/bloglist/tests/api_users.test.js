const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./user_test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('Create new user - POST /api/users', () => {

  test('request without username invokes response status 400', async () => {
    await api
      .post('/api/users')
      .send(helper.userWithoutUsername)
      .expect(400)
  })

  test('request without unique username invokes response status 400', async () => {
    await api
      .post('/api/users')
      .send(helper.userWithoutUniqueUsername)
      .expect(400)
  })

  test('request without name invokes response status 400', async () => {
    await api
      .post('/api/users')
      .send(helper.userWithoutName)
      .expect(400)
  })

  test('request without password invokes response status 400', async () => {
    await api
      .post('/api/users')
      .send(helper.userWithoutPassword)
      .expect(400)
  })

  test('request with too short password invokes response status 400', async () => {
    await api
      .post('/api/users')
      .send(helper.userWithTooShortPassword)
      .expect(400)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})