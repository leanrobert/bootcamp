import React, { useState, useEffect } from 'react'
import { getAll, create, update, deletePerson } from './services/phonebook'
import SearchBar from './components/SearchBar'
import Form from './components/Form'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPhone, setNewPhone ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    getAll().then(persons => setPersons(persons.data))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const duplicated = persons.find(one => one.name === newName)

    if(duplicated) {
      if(window.confirm(`${duplicated.name} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(duplicated)
      }
    } else { 
      const person = {
        name: newName,
        number: newPhone
      }

      create(person).then(promise => setPersons(persons.concat(promise.data)))
    }
    setNewName('')
    setNewPhone('')
  }

  const updatePerson = (person) => {
    const newPerson = {
      name: person.name,
      number: newPhone
    }

    update(person.id, newPerson).then(response => setPersons(persons.map(people => person.id !== people.id ? people : response.data)))
  }

  const deleteEntry = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      deletePerson(person.id).then(promise => setPersons(persons.filter(item => item.id !== person.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} search={search} delentry={deleteEntry}/>
    </div>
  )
}

export default App
