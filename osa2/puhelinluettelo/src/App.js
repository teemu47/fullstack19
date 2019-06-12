import React, { useState } from 'react'

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

const Persons = ({personList}) =>
  personList.map(person => <Person key={person.name} person={person}/>)

const Person = ({person}) =>
  <p>{`${person.name}: ${person.number}`}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(filter) >= 0)
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(personObject));
      setNewName('')
      setNewNumber('')
      setFilter('')
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      
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
      />
    </div>
  )
  
}

export default App
