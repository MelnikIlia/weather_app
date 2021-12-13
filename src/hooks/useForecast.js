import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { fetchCoordinatesByName, fetchCoordinatesByIp, fetchForecast } from '../api/forecastAPI'

function useForecast() {
  const { setForecast, setLocation, setLoading, setError } = useContext(AppContext)

  const getCoordinatesByIp = getCoordinates(fetchCoordinatesByIp)
  const getCoordinatesByName = getCoordinates(fetchCoordinatesByName)

  function getCoordinates(fn) {
    return async (param) => {
      try {
        const res = await fn(param)

        if (res.status === 200) {
          const data = Array.isArray(res.data) ? res.data[0] : res.data

          if (data.length === 0) {
            setError("Can't find this location")
          } else {
            const coordinates = data.coordinates
            const name = `${data.name}, ${data.country.name}`

            setLocation({ coordinates, name })
          }
        } else {
          throw Error(res)
        }
      } catch (err) {
        if (err.status === 504) {
          setError('Server response time expired. Try again later')
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
          setForecast(res.data)
          setLoading(false)
        } else {
          throw Error(res)
        }
      } catch (err) {
        if (err.status === 504) setError('Server response time expired. Try again later')
      }
    })()
  }

  return { getCoordinatesByIp, getCoordinatesByName, getForecast }
}

export { useForecast }
