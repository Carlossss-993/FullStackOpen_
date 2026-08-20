const dummy = () => 1

const totalLikes = blogs =>
  blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) {return null}
  return blogs.reduce((favoritedBlog, blog) => {
    return blog.likes > favoritedBlog.likes
      ? { title: blog.title, author: blog.author, likes: blog.likes }
      : favoritedBlog
  }, { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}