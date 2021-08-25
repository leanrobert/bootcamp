import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import Form from './components/Form'
import PhoneBook from './components/PhoneBook'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPhone, setNewPhone ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(persons => {
        setPersons(persons.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const person = {
      name: newName,
      number: newPhone
    }

    if(persons.find(one => one.name === person.name)) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      axios.post("http://localhost:3001/persons", person)
        .then(promise => setPersons(persons.concat(promise.data)
        ))
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
