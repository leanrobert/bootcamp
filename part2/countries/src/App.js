import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country, single }) => {
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => setWeather(response.data))
  }, [country.capital])

  return(
    <div>
      {single ? (
        <div>
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
        <h2>Weather in {country.capital}</h2>
        {weather && (
          <div>
            <p><b>temperature: </b> {weather.current.temperature}</p>
            <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} />
            <p><b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
          </div>            
        )}
      </div>
      ) : 
      show ? (
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
          <h2>Weather in {country.capital}</h2>
          {weather && (
            <div>
              <p><b>temperature: </b> {weather.current.temperature}</p>
              <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} />
              <p><b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>            
          )}
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
            <CountryDetails key={country.cioc + country.name} country={country} single={true} />
          ))
        ) : filteredCountries.map(country => 
            <CountryDetails key={country.cioc + country.name} country={country} single={false} />
        )}
      </div>
    </div>
  )
}

export default App

