import { useStore } from '../store/store'
import { updateForecast, updateLocation, setLoading, setError } from '../actions/actions'
import { fetchCoordinatesByName, fetchCoordinatesByIp, fetchForecast } from '../api/forecastAPI'

function useForecast() {
  const [, dispatch] = useStore()
  const getCoordinatesByIp = getCoordinates(fetchCoordinatesByIp)
  const getCoordinatesByName = getCoordinates(fetchCoordinatesByName)

  function getCoordinates(fn) {
    return async (param) => {
      try {
        const res = await fn(param)

        if (res.status === 200) {
          const data = Array.isArray(res.data) ? res.data[0] : res.data

          if (data.length === 0) {
            dispatch(setError("Can't find this location"))
          } else {
            const coordinates = data.coordinates
            const name = `${data.name}, ${data.country.name}`

            dispatch(updateLocation({ coordinates, name }))
          }
        } else {
          throw Error(res)
        }
      } catch (err) {
        if (err.status === 504) {
          dispatch(setError('Server response time expired. Try again later'))
        }
      }
    }
  }

  function getForecast({ coordinates, name }) {
    (async () => {
      try {
        const res = await fetchForecast(coordinates)

        if (res.status === 200) {
          Object.assign(res.data, { name: name })
          dispatch(updateForecast(res.data))
          dispatch(setLoading(false))
        } else {
          throw Error(res)
        }
      } catch (err) {
        if (err.status === 504) dispatch(setError('Server response time expired. Try again later'))
        if (err.status >= 400 && err.status < 500) {
          dispatch(setError('The name of the place was entered incorrectly. Try again'))
        }
      }
    })()
  }

  return { getCoordinatesByIp, getCoordinatesByName, getForecast }
}

export { useForecast }
