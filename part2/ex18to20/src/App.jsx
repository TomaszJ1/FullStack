import { useEffect, useState } from 'react'
import countriesService from './services/countries'
function App() {

  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    countriesService.getAll().then(response => {
      setCountriesToShow(response)
      setCountries(response)
    })
  }, [])

  const handleUserInput = event => setUserInput(event.target.value)
  
  const handleUserClick = text => setUserInput(text)

  useEffect(() => {
    setCountriesToShow(countries.filter(n =>
       n.name.common.toUpperCase().includes(userInput.toUpperCase())))
  }, [userInput])

    return (
      <>
        <p>find countries <input value={userInput} onChange={handleUserInput} /></p>
        <Country handleUserClick={handleUserClick} countriesToShow={countriesToShow} />
      </>
    )
  
}

const Country = ({ countriesToShow, handleUserClick }) => {
  if(countriesToShow.length === 1) {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
      countriesService.getWeather(countriesToShow[0].capital[0]).then(response => {
        setWeather(response)
      })
    }, [])

    var languages = []
    const languageKeys = Object.keys(countriesToShow[0].languages)
    languageKeys.forEach((key) => languages = languages.concat(countriesToShow[0].languages[key]))
    return (
      <>
        {countriesToShow.map(n => <div key={n.name.common}><h1>{n.name.common}</h1> 
        <br /> capital {n.capital}
        <br /> area {n.area}
        <br /> languages:
        {languages.map(p => <li key={p}>{p}</li>)}
        <img width="600px" height="350px" src={n.flags.svg}></img>
        <h2>Weather in {n.capital}</h2> 
        <br /> temperature {weather !== null ? weather.main.feels_like-273.15 : ''} Celcius
        <img src={ weather !== null ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : '' }></img>
        <br /> wind {weather !== null ? weather.wind.speed : ''} m/s
         </div>)}
      </>
    )
  }
  else if(countriesToShow.length <= 10) {
    return(
      <>
        {countriesToShow.map(n => <p key={n.name.common}>{n.name.common} <button value={n.name.common} onClick={() => handleUserClick(n.name.common)}>show</button></p>)}
      </>)
  }
  else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  }

export default App
