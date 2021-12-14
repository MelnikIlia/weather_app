import React, { useContext, useEffect } from 'react'
import { AppContext } from './AppContext'
import { useForecast } from './hooks/useForecast'
import { isObjectEmpty } from './lib/checkFunctions'

import Page from './components/Page/Page'

import './App.css'

function App() {
  const { location, setLocation, setForecast, setMessage, setLoading } = useContext(AppContext)
  const { getCoordinatesByIp, getForecast } = useForecast()
  const { forecastStored } = JSON.parse(localStorage.getItem('forecastData')) || false
  const { locationStored } = JSON.parse(localStorage.getItem('serviceData')) || false

  useEffect(() => {
    const { lastUpdated } = JSON.parse(localStorage.getItem('serviceData')) || false
    const now = Date.now()
    const hourInterval = 60 * (60 * 1000)

    if (isObjectEmpty(locationStored)) {
      setMessage('Enable location detection to get the forecast automatically')

      navigator.geolocation.getCurrentPosition(
        () => {
          setMessage('')
          getCoordinatesByIp()
        },
        (error) => {
          console.error(error)
        }
      )
    } else if (lastUpdated && now - lastUpdated > hourInterval) {
      if (!isObjectEmpty(locationStored)) getForecast(locationStored)
    } else {
      setForecast(forecastStored)
      !isObjectEmpty(locationStored) && setLocation(locationStored)
    }
  }, [])

  useEffect(() => {
    if (!isObjectEmpty(location)) {
      if (JSON.stringify(location) !== JSON.stringify(locationStored)) {
        setForecast({})
        setLoading(true)
        getForecast(location)
      }
    }
  }, [location])

  return (
    <div className="App">
      <Page />
    </div>
  )
}

export default App
