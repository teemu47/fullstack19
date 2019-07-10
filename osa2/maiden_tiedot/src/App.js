import React, {useState, useEffect} from 'react';
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const countriesToShow = countries.filter(country => country.name.toLowerCase().indexOf(filter) >= 0)
  
  useEffect(() => {
    countryService
      .getAll()
      .then(countriesData => {
        setCountries(countriesData)
      })
  }, []);
  
  const filterList = (event) => {
    setFilter(event.target.value)
  }
  
  const showCountry = (country) => {
    setFilter(country.toLowerCase())
  }
  
  const pageStyle = {
    margin: 5
  }
  
  return (
    <div style={pageStyle}>
      <Filter
        filter={filter}
        filterList={filterList}
      />
      <Countries
        countryList={countriesToShow}
        showCountry={showCountry}
      />
    </div>
  )
}

const Countries = ({countryList, showCountry}) => {
  if (countryList.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countryList.length > 1) {
    return (
      countryList.map(country => <div key={country.name}>{country.name} <button onClick={() => showCountry(country.name)}>show</button></div>)
    )
  } else {
    return (
      countryList.map(country => <Country key={country.name} country={country}/>)
    )
  }
}

const Country = ({country}) => {
  const flagStyle = {
    width: 150,
    height: 'auto'
  }
  
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
      </div>
      <div>
        popultation {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img style={flagStyle} src={country.flag}/>
    </div>
  )
}

const Filter = ({filter, filterList}) =>
  <div>
    find countries <input
    value={filter}
    onChange={filterList}
  />
  </div>

export default App;
