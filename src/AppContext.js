import React, { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import { isObjectEmpty } from './lib/checkFunctions'

export const AppContext = createContext([{}, () => {}])

export const AppProvider = (props) => {
  const [forecast, setForecast] = useState({})
  const [location, setLocation] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    !isObjectEmpty(forecast) && localStorage.setItem(
      'forecastData',
      JSON.stringify({
        forecastStored: forecast
      })
    )
  }, [forecast])

  useEffect(() => {
    !isObjectEmpty(location) && localStorage.setItem(
      'serviceData',
      JSON.stringify({
        locationStored: location,
        lastUpdated: (forecast?.current?.dt * 1000)
      })
    )
  }, [location])

  return (
    <AppContext.Provider value={{ forecast, setForecast, location, setLocation, isLoading, setLoading, error, setError }}>
      {props.children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.any
}
