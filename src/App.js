import React, { useEffect } from 'react'
import { useStore } from './store/store'
import { updateForecast, updateLocation, setLoading } from './actions/actions'
import { useForecast } from './hooks/useForecast'
import { isObjectEmpty } from './lib/checkFunctions'

import Page from './components/Page/Page'

import './App.css'

function App() {
  const [appState, dispatch] = useStore()
  const { getForecast } = useForecast()
  const { forecastStored } = JSON.parse(localStorage.getItem('forecastData')) || false
  const { locationStored } = JSON.parse(localStorage.getItem('serviceData')) || false

  useEffect(() => {
    const { lastUpdated } = JSON.parse(localStorage.getItem('serviceData')) || false
    const now = Date.now()
    const hourInterval = 60 * (60 * 1000)

    if (lastUpdated && now - lastUpdated > hourInterval) {
      if (!isObjectEmpty(locationStored)) getForecast(locationStored)
    } else {
      !isObjectEmpty(forecastStored) && dispatch(updateForecast(forecastStored))
      !isObjectEmpty(locationStored) && dispatch(updateLocation(locationStored))
    }
  }, [])

  useEffect(() => {
    if (!isObjectEmpty(appState.location)) {
      if (JSON.stringify(appState.location) !== JSON.stringify(locationStored)) {
        dispatch(updateForecast({}))
        dispatch(setLoading(true))
        getForecast(appState.location)
      }
    }
  }, [appState.location])

  return (
    <div className="App">
      <Page />
    </div>
  )
}

export default App
