const Blog = require('../models/blog')

const initialBLogs = [
  {
    title: 'React v18.0',
    author: 'React Team',
    url: 'https://reactjs.org/blog/2022/03/29/react-v18.html',
    likes: 12,
  },
  {
    title: 'Canonical stack',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 15,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htm',
    likes: 10,
  }
]

const nonExistingId = async () => {
  const blog = new Blog( initialBLogs[2] )
  await blog.save()
  await blog.deleteOne
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find()
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBLogs, nonExistingId, blogsInDb
}