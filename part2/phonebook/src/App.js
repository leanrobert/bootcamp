import React, { useState } from 'react'

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
      <p>filter shown with <input value={search} onChange={e => setSearch(e.target.value)} /></p>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
        <div>number: <input value={newPhone} onChange={e => setNewPhone(e.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map((person, i) => (
        <p key={i}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App
