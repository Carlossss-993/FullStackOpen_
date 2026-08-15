import { useState, useEffect } from 'react'

import countriesService from './services/countries'
import weatherService from './services/weather'

function App() {

  const [ value, setValue ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState([])

  const [ weatherInfo, setWeatherInfo ] = useState(null)

  useEffect(() => {
    countriesService.getAll()
      .then(data => {
        setCountries(data)
        setCountriesToShow(data)
      })
  }, [])

  const onChange = (event) => {
    setValue(event.target.value.toLowerCase())
    const newCountries = countries.filter((country) => country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setCountriesToShow(newCountries)
    if (newCountries.length === 1) {
      weatherService
        .getWeather(countriesToShow[0].capitalInfo.latlng)
        .then(data => {setWeatherInfo(data)})
    }
  }

  const onClick = ( countryToShow ) => {
    setCountriesToShow(countriesToShow.filter(country => country.name.common === countryToShow))
    setWeatherInfo(weatherService.getWeather(countriesToShow[0].capitalInfo.latlng))
  }
    

  return (
    <div>
      <form>
        <p>Find countries: </p>
        <input value={value} onChange={onChange}/>
      </form>
      {countriesToShow.length > 10 
        ? <p>Too many countries, please try to be more specific</p>
        : countriesToShow.length === 1
          ? <>
              <h2>{countriesToShow[0].name.common}</h2>
              <p>Capital: {countriesToShow[0].capital}</p>
              <p>Area: {countriesToShow[0].area}</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(countriesToShow[0].languages).map(lang => <li key={lang}>{lang}</li>)}
              </ul>
              <img src={countriesToShow[0].flags.png} />
              {weatherInfo === null
                ? null
                : <>
                    {console.log(weatherInfo)}
                    <p>Temperature: {weatherInfo.main.temp}</p>
                    <img 
                      src={weatherService.getIconLink(weatherInfo.weather[0].icon)} 
                    />
                    <p>Wind: {weatherInfo.wind.speed} m/s</p>
                  </>
              }
            </>
          : countriesToShow.length === 0
            ? <p>There are not countries named as you wrote</p>
            : countriesToShow.map((country) => 
              <>
                <p key={country.name.official}>
                  {country.name.common} <button key={`${country.name.official}Button`} onClick={() => {onClick(country.name.common)}} >Show</button>
                </p>
              </>)
      }
    </div>
  )
}

export default App
