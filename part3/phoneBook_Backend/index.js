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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor((Math.random() * 1000000))
}

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
      <a href="/">Back to API home</a><br/>
      <a href="/api/persons">Visit our API</a>
    </div>
    `)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
    .catch(error => {
        res.status(404)
        res.send(`
            <div>
                <h1>Person not found</h1>
                <p>Please try with another id</p>
                <a href="/">Back to home</a><br/>
                <a href="/info">Consult our info</a><br/>
                <a href="/api/persons">Visit our API</a>
            </div>    
        `)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const removedPerson = persons.filter((person) => person.id === id)
    if (removedPerson) {
        persons = persons.filter((person) => person.id !== removedPerson.id)
        res.send(removedPerson)
    } else {
        res.status(404).json({
            error: 'Person not found'
        })
    }  
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const newPerson = new Person({
        name: body.name, 
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
