export const updateLocation = (location) => ({
  type: 'UPDATE_LOCATION',
  location
})

export const updateForecast = (forecast) => ({
  type: 'UPDATE_FORECAST',
  forecast
})

export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  message
})

export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  isLoading
})

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
})
