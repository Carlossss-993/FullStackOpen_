import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

import phoneService from './services/phone'

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} has already been added to this phoneBook`)
      setNewName('')
    } else {
      phoneService
        .add({name: newName, number: newNumber})
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson))
          setPersonsToShow(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          setFilter('')
        })
    }
  }

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