const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()

  for(let blog of helper.initialBLogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(helper.initialBLogs.length, response.body.length)
})

test.only('blogs returned have "id" property defined instead of "_id"', async () => {
  const response = await api.get('/api/blogs')
  const blogToCheck = response.body[0]
  assert.notStrictEqual(blogToCheck.id, undefined)
  assert.strictEqual(blogToCheck._id, undefined)
})

after(async () => {
  await mongoose.connection.close()
})