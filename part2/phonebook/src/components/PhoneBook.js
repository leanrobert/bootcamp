import React from 'react'

const PhoneBook = ({ persons, search }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map((person, i) => (
                <p key={i}>{person.name} {person.number}</p>
            ))}
        </div>
    )
}

export default PhoneBook
