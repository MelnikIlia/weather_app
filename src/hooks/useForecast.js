import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { fetchCoordinates, fetchForecast } from '../api/forecastAPI'

function useForecast() {
  const { setForecast, setLocation, setLoading, setError } = useContext(AppContext)

  function getCoordinates(location) {
    (async () => {
      try {
        const res = await fetchCoordinates(location)

        if (res.status === 200) {
          const coordinates = res.data[0].coordinates
          const name = `${res.data[0].name}, ${res.data[0].country.name}`

          if (res.data.length === 0) {
            throw Error("Can't find this location")
          } else {
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
    })()
  }

  function getForecast({ coordinates, name }) {
    (async () => {
      setForecast({})
      setLoading(true)

      try {
        const res = await fetchForecast(coordinates)

        if (res.status === 200) {
          res.data.name = name
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

  return { getCoordinates, getForecast }
}

export { useForecast }
