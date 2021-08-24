import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import Form from './components/Form'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newPhone, setNewPhone ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ search, setSearch ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    const person = {
      name: newName,
      number: newPhone
    }

    if(persons.find(one => one.name === person.name)) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} search={search} />
    </div>
  )
}

export default App
