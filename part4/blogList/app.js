const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const { unknownEndpoint, errorHandler } = require('./utils/middleware')

const mongoUrl = config.MONGOOSE_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app