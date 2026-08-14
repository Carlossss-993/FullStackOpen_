import { useState, useEffect } from 'react'

import countriesService from './services/countries'

function App() {

  const [ value, setValue ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState([])

  useEffect(() => {
    countriesService.getAll()
      .then(data => {
        setCountries(data)
        setCountriesToShow(data)
      })
  }, [])

  const onChange = (event) => {
    setValue(event.target.value.toLowerCase())
    setCountriesToShow(countries.filter((country) => country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase())))
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
            </>
          : countriesToShow.length === 0
            ? <p>There are not countries named as you wrote</p>
            : countriesToShow.map((country) => <p key={country.name.official}>{country.name.common}</p>)
      }
    </div>
  )
}

export default App
