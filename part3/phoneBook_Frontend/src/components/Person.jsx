const Person = ({ person, toggleRemovePerson }) => {

  return (
    <div>
      <p>
        {person.name}: {person.number}
      </p>
      <button onClick={() => toggleRemovePerson(person.id)}>Remove</button>
    </div>
  )
}

export default Person;