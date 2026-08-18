require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
app.use(morgan((tokens, req, res) => {
    const log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if (tokens.method(req, res) === 'POST') {
        log.push(JSON.stringify(req.body))
    }
    return log.join(' ')
}))

const Person = require('./models/person')

app.get('/api', (req, res) => {
  res.send(`
    <div>
      <h1>Welcome to your Phonebook</h1>
      <a href="/">Back to home</a><br/>
      <a href="/info">Consult our info</a><br/>
      <a href="/api/persons">Visit our API</a>
    </div>
  `)
})

app.get('/api/info', (req, res) => {
    const currentDate = new Date()
    res.send(`
    <div>
      <h1>Welcome to your Phonebook info</h1>
      <p>Your phonebook has info for ${persons.length} people</p>
      <p>${currentDate}</p>
      <a href="/">Back to home</a><br/>
      <a href="/api">Back to API home</a><br/>
      <a href="/api/persons">Visit our API</a>
    </div>
    `)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404)
                res.send(`
                    <div>
                        <h1>Person not found</h1>
                        <p>Please try with another id</p>
                        <a href="/">Back to home</a><br/>
                        <a href="/api">Back to API home</a><br/>
                        <a href="/info">Consult our info</a><br/>
                        <a href="/api/persons">Visit our API</a>
                    </div>    
                `)
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(person => {
            if (person) {
                res.send(person)
            } else {
                res.status(404).json({
                    error: 'Person not found'
                })
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {

    const newPerson = new Person({
        name: req.body.name, 
        number: req.body.number
    })

    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, number: req.body.number },
        { new: true, runValidators: true, context: 'queery' }
    )   
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson)
            } else {
                res.status(404).json({
                    error: 'person not found'
                })
            }
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = ((error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message})
    }

    next(error)
})
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
