import { appInitialState } from '../store/store'

export const reducer = (state = appInitialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: action.location
      }
    case 'UPDATE_FORECAST':
      return {
        ...state,
        forecast: action.forecast
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      }
  }
  return state
}
