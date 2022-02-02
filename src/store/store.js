import React, { useEffect, createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import { isObjectEmpty } from '../lib/checkFunctions'
import { reducer } from '../reducers/reducers'

export const appInitialState = {
  forecast: {},
  location: {},
  isLoading: false,
  message: '',
  error: null
}

export const AppContext = createContext(appInitialState)

export const useStore = () => useContext(AppContext)

export const AppProvider = (props) => {
  const [appState, dispatch] = useReducer(reducer, appInitialState)

  useEffect(() => {
    !isObjectEmpty(appState.forecast) &&
      localStorage.setItem(
        'forecastData',
        JSON.stringify({
          forecastStored: appState.forecast
        })
      )
    !isObjectEmpty(appState.location) &&
      localStorage.setItem(
        'serviceData',
        JSON.stringify({
          locationStored: appState.location,
          lastUpdated: appState.forecast?.current?.dt * 1000
        })
      )
  }, [appState.forecast, appState.location])

  return <AppContext.Provider value={[appState, dispatch]}>{props.children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.any
}
