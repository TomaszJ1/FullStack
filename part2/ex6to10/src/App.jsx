import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  const [filteredName, setNewFilteredName] = useState('')

  const handlefilteredNameChange = (event) => {
      setNewFilteredName(event.target.value)
    }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    status: 0
  })

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }


    if(persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === personObject.name)
        const changedPerson = { ...person, number: personObject.number }
        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
            setNotification({ message: `Changed ${response.name}'s number`, status: 1})
            setTimeout(() => {
              setNotification({
                message: '',
                status: 0
              })
            }, 5000)
          })
          .catch(() => {
            setNotification({ message: `Information of ${person.name} has already been removed from the server`, status: 0})
            setTimeout(() => {
              setNotification({
                message: '',
                status: 0
              })
            }, 5000)
            setPersons(persons.filter(n => n.id !== person.id))
        })
      }
    }
    else{
      personService.create(personObject).then(response => {
        setPersons(persons.concat(response))
        setNotification({ message: `Added ${response.name}`, status: 1})
        setTimeout(() => {
          setNotification({
            message: '',
            status: 0
          })
        }, 5000)
      })
    } 
  }

  const removePerson = (id) => {
    const personToRemove = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService.remove(personToRemove).then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }
    }

    const handlePersonChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} status={notification.status} />
      <Filter handlefilteredNameChange={handlefilteredNameChange} />
      <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <Persons filteredName={filteredName} persons={persons} removePerson={removePerson} />
    </div>
  )
}

export default App