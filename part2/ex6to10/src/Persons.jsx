const Persons = ({ persons, filteredName, removePerson }) => {
    return (
        <>
        {persons.filter(person =>
             person.name
             .toUpperCase()
             .includes(filteredName.toUpperCase()))
             .map(person => <p key={person.id}> {person.name} - {person.number} <button onClick={() => removePerson(person.id)}>delete</button> </p>)}
        </>
    )
}

export default Persons