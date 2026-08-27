const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs =>
  blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) {return null}
  return blogs.reduce((favoritedBlog, blog) =>
    blog.likes > favoritedBlog.likes
      ? { title: blog.title, author: blog.author, likes: blog.likes }
      : favoritedBlog
  , { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes })
}

// const mostBlogs = blogs => {
//   if (blogs.length === 0) {return null}
//   const newAuthors =
//     blogs.reduce((authors, blog) => {
//       const actualAutor = authors.findIndex(author => author.author === blog.author)
//       if (actualAutor !== -1) {
//         authors[actualAutor].blogs = authors[actualAutor].blogs + 1
//       } else {
//         authors.push({ author: blog.author, blogs: 1 })
//       }
//       return authors
//     }, [])

//   return newAuthors.reduce((mostBlogsAuthor, author) =>
//     author.blogs > mostBlogsAuthor.blogs
//       ? author
//       : mostBlogsAuthor
//   , newAuthors[0])
// }

const mostBlogs = blogs => {
  if (blogs.length === 0) {return null}
  return _.chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value()
}

// const mostLikes = blogs => {
//   if (blogs.length === 0) {return null}
//   const newAuthors =
//     blogs.reduce((authors, blog) => {
//       const actualAutor = authors.findIndex(author => author.author === blog.author)
//       if (actualAutor !== -1) {
//         authors[actualAutor].likes = authors[actualAutor].likes + blog.likes
//       } else {
//         authors.push({ author: blog.author, likes: blog.likes })
//       }
//       return authors
//     }, [])

//   return newAuthors.reduce((mostBlogsAuthor, author) =>
//     author.likes > mostBlogsAuthor.likes
//       ? author
//       : mostBlogsAuthor
//   , newAuthors[0])
// }

const mostLikes = blogs => {
  if (blogs.length === 0) {return null}
  return _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .maxBy('likes')
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}