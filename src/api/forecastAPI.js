import axios from 'axios'
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const SPOTT_API_KEY = process.env.REACT_APP_SPOTT_API_KEY

const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const SPOTT_URL = 'https://spott.p.rapidapi.com/'

function fetchData(options) {
  return axios(options)
    .then((res) => res)
    .catch((err) => err)
}

function autocompleteName(cityName) {
  return fetchData({
    method: 'get',
    url: `${SPOTT_URL}places/autocomplete`,
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

function fetchCoordinatesByName(cityName) {
  return fetchData({
    method: 'get',
    url: `${SPOTT_URL}places`,
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

function fetchCoordinatesByIp() {
  return fetchData({
    method: 'get',
    url: `${SPOTT_URL}places/ip/me`,
    headers: {
      'x-rapidapi-host': 'spott.p.rapidapi.com',
      'x-rapidapi-key': `${SPOTT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
}

function fetchForecast({ latitude, longitude }) {
  return fetchData({
    method: 'get',
    url: `${BASE_URL}onecall`,
    params: {
      appid: `${WEATHER_API_KEY}`,
      lat: latitude,
      lon: longitude,
      exclude: 'minutely,hourly',
      units: 'metric'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export { fetchForecast, fetchCoordinatesByName, fetchCoordinatesByIp, autocompleteName }
