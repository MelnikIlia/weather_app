import axios from 'axios'
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const SPOTT_API_KEY = process.env.REACT_APP_SPOTT_API_KEY

const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const SPOTT_URL = 'https://spott.p.rapidapi.com/'

async function autocompleteName(cityName) {
  const res = await axios.get(`${SPOTT_URL}places/autocomplete`, {
    params: {
      type: 'CITY',
      q: cityName,
      skip: 0,
      limit: 7
    },
    headers: {
      'x-rapidapi-host': 'spott.p.rapidapi.com',
      'x-rapidapi-key': `${SPOTT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  return res.data
}

async function fetchCoordinates(cityName) {
  const res = await axios.get(`${SPOTT_URL}places`, {
    params: {
      type: 'CITY',
      q: cityName,
      skip: 0,
      limit: 1
    },
    headers: {
      'x-rapidapi-host': 'spott.p.rapidapi.com',
      'x-rapidapi-key': `${SPOTT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  return res.data
}

async function fetchForecast(coordinates) {
  const res = await axios.get(`${BASE_URL}onecall`, {
    params: {
      appid: `${WEATHER_API_KEY}`,
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      exclude: 'minutely,hourly',
      units: 'metric'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.data
}

export {
  fetchForecast,
  fetchCoordinates,
  autocompleteName
}
