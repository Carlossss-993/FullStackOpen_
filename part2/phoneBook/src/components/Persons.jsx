import Person from "./Person"

const Persons = ({ personsToShow, toggleRemovePerson }) => {
  
  return (
    <>
      {personsToShow.map((person) => <Person key={person.name} person={person} toggleRemovePerson={toggleRemovePerson} />)}
    </>
  );
};

export default Persons;