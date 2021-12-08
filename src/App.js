import React, { useContext, useEffect } from 'react'
import { usePageVisibility } from 'react-page-visibility'
import { AppContext } from './AppContext'

import Page from './components/Page/Page'

import './App.css'
import { useForecast } from './hooks/useForecast'

function App() {
  const isPageVisible = usePageVisibility()
  const { location, setForecast } = useContext(AppContext)
  const { getForecast } = useForecast()

  useEffect(() => {
    const { location } = JSON.parse(localStorage.getItem('serviceData')) || false
    const { forecast } = JSON.parse(localStorage.getItem('forecastData')) || false
    const isLocation = location && Object.keys(location).length > 0
    const isForecast = forecast && Object.keys(forecast).length > 0
    const hourInterval = 60 * (60 * 1000)

    if (isForecast) setForecast(forecast)

    setTimeout(function updateForecast() {
      if (isPageVisible && isLocation) {
        getForecast(location)
      }

      setTimeout(updateForecast, hourInterval)
    }, hourInterval)
  }, [])

  useEffect(() => {
    const isLocation = Object.keys(location).length > 0
    isLocation && getForecast(location)
  }, [location])

  return (
    <div className="App">
      <Page />
    </div>
  )
}

export default App
