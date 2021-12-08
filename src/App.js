import React, { useContext, useEffect } from 'react'
import { usePageVisibility } from 'react-page-visibility'
import { AppContext } from './AppContext'
import { fetchForecast } from './api/forecastAPI'

import Page from './components/Page/Page'

import './App.css'

function App() {
  const isPageVisible = usePageVisibility()
  const { setForecast, setError } = useContext(AppContext)

  useEffect(() => {
    const { lat, lon } = JSON.parse(localStorage?.getItem('serviceData')) || {}
    const { forecast } = JSON.parse(localStorage?.getItem('forecastData')) || {}
    const isForecast = Object.keys(forecast).length > 0
    const hourInterval = 60 * (60 * 1000)

    if (isForecast) setForecast(forecast)

    setTimeout(function updateForecast() {
      if (isPageVisible) {
        fetchForecast({ latitude: lat, longitude: lon }).then((res) => {
          if (res.status === 504) {
            setError('Server response time expired. Try again later')
          } else {
            setForecast({ name: forecast.name, ...res })
          }
        })
      }

      setTimeout(updateForecast, hourInterval)
    }, hourInterval)
  }, [])

  return (
    <div className="App">
      <Page />
    </div>
  )
}

export default App
