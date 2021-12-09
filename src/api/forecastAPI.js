import axios from 'axios'
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const SPOTT_API_KEY = process.env.REACT_APP_SPOTT_API_KEY

const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const SPOTT_URL = 'https://spott.p.rapidapi.com/'

async function fetchData(url, options) {
  return await axios
    .get(url, options)
    .then((res) => res)
    .catch((err) => {
      if (err.response) return err
    })
}

function autocompleteName(cityName) {
  return fetchData(`${SPOTT_URL}places/autocomplete`, {
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
}

function fetchCoordinates(cityName) {
  return fetchData(`${SPOTT_URL}places`, {
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
}

function fetchForecast(coordinates) {
  return fetchData(`${BASE_URL}onecall`, {
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
}

export { fetchForecast, fetchCoordinates, autocompleteName }
