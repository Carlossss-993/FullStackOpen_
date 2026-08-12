import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }, []);

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