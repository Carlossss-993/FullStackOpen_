import { useState } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [personsToShow, setPersonsToShow] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleInputName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputFilter = (event) => {
    setFilter(event.target.value)
    const newPersons = persons.filter((person) => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    
    if (event.target.value === '') {
      setPersonsToShow(persons)
    } else {
      setPersonsToShow(newPersons)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} has already been added to this phoneBook`)
      setNewName('')
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setPersonsToShow(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
      setFilter('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm newName={newName} handleInputName={handleInputName} newNumber={newNumber} handleInputNumber={handleInputNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Filter filter={filter} handleInputFilter={handleInputFilter} />
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App