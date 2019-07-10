import React, {useState, useEffect} from 'react';
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const countriesToShow = countries.filter(country => country.name.toLowerCase().indexOf(filter) >= 0)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weatherData, setWeatherData] = useState({})
  
  useEffect(() => {
    setWeatherData({}) // in order to prevent wrong weather to flash when changing countries
    if (selectedCountry) {
      weatherService
        .get(selectedCountry)
        .then(weatherData => {
          setWeatherData(weatherData)
        })
    }
  }, [selectedCountry])
  
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
        weatherData={weatherData}
        setSelectedCountry={setSelectedCountry}
        setWeatherData={setWeatherData}
      />
    </div>
  )
}

const Countries = ({countryList, showCountry, weatherData, setSelectedCountry}) => {
  if (countryList.length > 10) {
    setSelectedCountry('')
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countryList.length > 1) {
    setSelectedCountry('')
    return (
      countryList.map(country => <div key={country.name}>{country.name} <button onClick={() => showCountry(country.name)}>show</button></div>)
    )
  } else {
    const country = countryList[0]
    if (country) {
      setSelectedCountry(country.name)
    }
    return (
      countryList.map(country => <Country key={country.name} country={country} weatherData={weatherData}/>)
    )
  }
}

const Country = ({country, weatherData}) => {
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
      <img alt={`flag of ${country.name}`} style={flagStyle} src={country.flag}/>
      <Weather weatherData={weatherData}/>
    </div>
  )
}

const Weather = ({weatherData}) => {
  const iconStyle = {
    width: 100,
    height: 'auto'
  }
  
  if (Object.keys(weatherData).length > 0) {
    return (
      <div>
        <h2>Weather in {weatherData.location.name}</h2>
        <div><strong>temperature:</strong> {weatherData.current.temp_c} Celsius</div>
        <img alt={'weather icon'} style={iconStyle} src={weatherData.current.condition.icon}/>
        <div><strong>wind:</strong> {weatherData.current.wind_kph} kph direction {weatherData.current.wind_dir}</div>
      </div>
    );
  }
  return (<div></div>)
}

const Filter = ({filter, filterList}) =>
  <div>
    find countries <input
    value={filter}
    onChange={filterList}
  />
  </div>

export default App;
