import Person from "./Person"

const Persons = ({ personsToShow, toggleRemovePerson }) => {
  console.log(personsToShow)
  return (
    <>
      {personsToShow.map((person) => <Person key={person.id} person={person} toggleRemovePerson={toggleRemovePerson} />)}
    </>
  );
};

export default Persons;