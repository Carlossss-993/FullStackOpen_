import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

import phoneService from './services/phone'

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState(null)

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

  useEffect(() => {
    phoneService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
        setNotification({message: 'Hi Carlos', isAnError: false})
        setTimeout(() => setNotification(null), 5000)
      })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      const result = window.confirm(`${newName} has already been added to this phoneBook, would you like to replace the old number with the new one?`)
      if (result) {
        const personToReplace = persons.filter(person => person.name === newName)[0]
        
        phoneService
          .replace(personToReplace.id, {name: newName, number: newNumber})
          .then(replacedPerson => {
            setPersons(persons.map(person => 
              person.id === replacedPerson.id
                ? replacedPerson
                : person
            ))
            setPersonsToShow(personsToShow.map(person => 
              person.id === replacedPerson.id
                ? replacedPerson
                : person
            ))
            setNotification({message: `${newName} has been updated`, isAnError: false})
            setTimeout(() => setNotification(null), 5000)
            setNewName('')
            setNewNumber('')
            setFilter('')
          })
          .catch(error => {
            const errorMessage = error.response.data.error
            setNotification({ message: errorMessage, isAnError: true })
            setTimeout(() => setNotification(null), 5000)
          })
      }
    } else {
      phoneService
        .add({name: newName, number: newNumber})
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson))
          setPersonsToShow(persons.concat(addedPerson))
          setNotification({message: `${newName} has been added`, isAnError: false})
          setTimeout(() => setNotification(null), 5000)
          setNewName('')
          setNewNumber('')
          setFilter('')
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          setNotification({ message: errorMessage, isAnError: true })
          setTimeout(() => setNotification(null), 5000)
        })
    }
  }

  const toggleRemovePerson = ( id ) => {
    const personToRemove = persons.find((person) => person.id === id)
    const result = window.confirm(`Would you like to remove ${personToRemove.name}?`)
    
    if (result) {
      phoneService
        .remove(id)
        .then((removedPerson) => {
          setPersons(persons.filter(person => person.id != id))
          setPersonsToShow(personsToShow.filter(person => person.id != id))
          setNotification({message: `${removedPerson.name} has been removed`, isAnError: false})
          setTimeout(() => setNotification(null), 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
      <PersonForm newName={newName} handleInputName={handleInputName} newNumber={newNumber} handleInputNumber={handleInputNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Filter filter={filter} handleInputFilter={handleInputFilter} />
      <Persons personsToShow={personsToShow} toggleRemovePerson={toggleRemovePerson}/>
    </div>
  )
}

export default App