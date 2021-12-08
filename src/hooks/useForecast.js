import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { fetchCoordinates, fetchForecast } from '../api/forecastAPI'

function useForecast() {
  const { setForecast, setLocation, setLoading, setError } = useContext(AppContext)

  function getCoordinates(location) {
    fetchCoordinates(location).then((res) => {
      if (res.length === 0) {
        setError("Can't find weather forecast for this location")
      } else if (res.status === 504) {
        setError('Server response time expired. Try again later')
      } else {
        const coordinates = res[0].coordinates
        const name = `${res[0].name}, ${res[0].country.name}`

        setLocation({ coordinates, name })
      }
    })
  }

  function getForecast({ coordinates, name }) {
    setForecast({})
    setLoading(true)

    fetchForecast(coordinates).then((res) => {
      if (res.status === 504) {
        setError('Server response time expired. Try again later')
      } else {
        res.name = name
        setForecast(res)
        setLoading(false)
      }
    })
  }

  return { getCoordinates, getForecast }
}

export { useForecast }
