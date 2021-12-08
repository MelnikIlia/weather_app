import React, { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'

export const AppContext = createContext([{}, () => {}])

export const AppProvider = (props) => {
  const [forecast, setForecast] = useState({})
  const [location, setLocation] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      'forecastData',
      JSON.stringify({
        forecast: forecast
      })
    )
    localStorage.setItem(
      'serviceData',
      JSON.stringify({
        location: location
      })
    )
  }, [forecast])

  return (
    <AppContext.Provider value={{ forecast, setForecast, location, setLocation, isLoading, setLoading, error, setError }}>
      {props.children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.any
}
