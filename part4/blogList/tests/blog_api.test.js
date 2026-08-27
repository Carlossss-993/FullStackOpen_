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

test('blogs returned have "id" property defined instead of "_id"', async () => {
  const response = await api.get('/api/blogs')
  const blogToCheck = response.body[0]
  assert.notStrictEqual(blogToCheck.id, undefined)
  assert.strictEqual(blogToCheck._id, undefined)
})

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBLogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('TDD harms architecture'))
})

test('default "likes" property is 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.at(-1).likes, 0)
})

test('a blog without "url" property cannot be added', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBLogs.length)
})

test('a blog without "title" property cannot be added', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBLogs.length)
})

test('a blog with a valid id can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBLogs.length - 1)
})

test('a blog with an invalid id cannot be deleted', async () => {

  await api
    .delete('/api/blogs/1')
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(helper.initialBLogs.length, blogsAtEnd.length)
})

test('a blog with an non existing id cannot be deleted', async () => {
  const nonExixtingId = await helper.nonExistingId()

  await api
    .delete(`/api/blogs/${nonExixtingId}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(helper.initialBLogs.length, blogsAtEnd.length)
})

test.only('a valid blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd[0]

  assert.strictEqual(blogToUpdate.likes + 1, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})