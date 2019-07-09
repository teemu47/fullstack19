import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(filter) >= 0)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(person => person.name === newName)
    if (oldPerson) {
      const changedPerson = {...oldPerson, number: newNumber}
      if (window.confirm(`Are you sure you want to replace ${newName}'s number with a new one?`)) {
        personService
          .update(oldPerson.id, changedPerson)
          .then(returnedPerson => {
            showSuccessMessage(`Changed ${returnedPerson.name}'s number`)
            setPersons(persons.map(p => p.id !== oldPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setFilter('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(newPerson => {
          showSuccessMessage(`Added ${newPerson.name}`)
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setFilter('')
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const filterList = (event) => {
    setFilter(event.target.value)
  }
  
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 4000)
  }
  
  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          showSuccessMessage(`Deleted ${person.name}`)
        })
    }
  }
  
  const Notification = () => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    
    if (successMessage === null) {
      return null
    }
    
    return (
      <div style={notificationStyle}>
        {successMessage}
      </div>
    )
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification/>
      
      <Filter
        filter={filter}
        filterList={filterList}
      />
      
      <h2>Add a new</h2>
      
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      
      <h2>Numbers</h2>
      
      <Persons
        personList={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )
  
}

const Filter = ({filter, filterList}) =>
  <div>
    filter: <input
    value={filter}
    onChange={filterList}
  />
  </div>

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) =>
  <form onSubmit={addPerson}>
    <div>
      name: <input
      value={newName}
      onChange={handleNameChange}
    />
    </div>
    <div>
      number: <input
      value={newNumber}
      onChange={handleNumberChange}
    />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({personList, removePerson}) =>
  personList.map(person => <Person key={person.name} person={person} removePerson={removePerson}/>)

const Person = ({person, removePerson}) =>
  <p>{`${person.name}: ${person.number}`} <button onClick={() => removePerson(person.id)}>poista</button></p>

export default App
