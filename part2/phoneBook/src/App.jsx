import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleInputName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} has already been added to this phoneBook`)
      setNewName('')
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}

export default App