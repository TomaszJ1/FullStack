import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const apiKey = '5a6a32d78711e772aba40a213f7d8e23'

const getAll = () => {
    const url = `${baseUrl}/api/all`
    const promise = axios.get(url)
    return promise.then(response => response.data)
}

const getWeather = ( city ) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const promise = fetch(apiUrl)
    return promise.then(response => response.json())
}

export default { getAll, getWeather }