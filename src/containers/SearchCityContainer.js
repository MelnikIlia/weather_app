import React, { useState, useEffect, useContext } from 'react'
import { useForecast } from '../hooks/useForecast'
import { AppContext } from '../AppContext'
import { autocompleteName } from '../api/forecastAPI'
import { MIN_AMOUNT_CHARS_TO_SEARCH } from '../constants/constants'

import SearchCityForm from '../components/SearchCityForm/SearchCityForm'

const validInput = (value) => {
  const regex = /^[a-zA-Z\s,]{4,}/g
  return regex.test(value)
}

const SearchCityContainer = () => {
  const [cityName, setCityName] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const { error, setError } = useContext(AppContext)
  const { getCoordinates } = useForecast()

  useEffect(() => {
    if (cityName.length === 0) setSuggestions([])

    if (cityName.length > 0) {
      validInput(cityName)
        ? setError(false)
        : setError('The name of the place must contain only letters and be longer than 3')
    }

    if (cityName.length === MIN_AMOUNT_CHARS_TO_SEARCH) {
      autocompleteName(cityName).then((res) => {
        if (res.status === 504) setError('Server response time expired. Try again later')
        else {
          setSuggestions(
            [...res].map((suggestion) => ({
              name: `${suggestion.name}, ${suggestion.country.name}`
            }))
          )
        }
      })
    }
  }, [cityName])

  const onSubmit = (e) => {
    e.preventDefault()

    !error && getCoordinates(cityName)

    setCityName('')
  }

  return <SearchCityForm cityName={cityName} setCityName={setCityName} suggestions={suggestions} onSubmit={onSubmit} />
}

export default SearchCityContainer

// location = suggestions.find((item) => item.name.includes(cityName))
