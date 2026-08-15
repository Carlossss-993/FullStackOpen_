const express = require('express')

const app = express()
app.use(express.json())

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

app.get('/', (req, res) => {
  res.send(`
    <div>
      <h1>Welcome to your Phonebook</h1>
      <a href="/info">Consult our info</a><br/>
      <a href="/api/persons">Visit our API</a>
    </div>
  `)
})

app.get('/info', (req, res) => {
    const currentDate = new Date()
    res.send(`
    <div>
      <h1>Welcome to your Phonebook info</h1>
      <p>Your phonebook has info for ${persons.length} people</p>
      <p>${currentDate}</p>
      <a href="/">Back to home</a><br/>
      <a href="/api/persons">Visit our API</a>
    </div>
    `)
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personToShow = persons.find((person) => person.id === id)
    if (personToShow) {
        res.send(personToShow)
    } else {
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
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name && body.number) {
        const newPerson = {id: generateId(), name: body.name, number: body.number}
        persons = persons.concat(newPerson)
        res.send(newPerson)
    } else {
        return res.status(400).json({
            error: 'content missing'
        })
    }
})



const PORT = 3001

app.listen(PORT)