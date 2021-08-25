import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [show, setShow] = useState(false)

  return(
    <div>
      {show ? (
        <div>
          <h1>{country.name}</h1>
          <button onClick={() => setShow(!show)}>hide</button>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map((language, i) => (
              <li key={i}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt={country.name} />  
        </div>
      ) : (
        <div>
          <span>{country.name}  </span>
          <button onClick={() => setShow(!show)}>show</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <div>
        find countries <input value={search} onChange={e => setSearch(e.target.value)} />
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          filteredCountries.map(country => (
            <div key={country.cioc + country.name} country={country}>
              <h1>{country.name}</h1>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
              <h2>languages</h2>
              <ul>
                {country.languages.map((language, i) => (
                  <li key={i}>{language.name}</li>
                ))}
              </ul>
              <img src={country.flag} alt={country.name} />  
            </div>
          ))
        ) : filteredCountries.map(country => 
            <CountryDetails key={country.cioc + country.name} country={country} />
        )}
      </div>
    </div>
  )
}

export default App

