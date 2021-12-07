import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { fetchCoordinates, fetchForecast } from '../api/forecastAPI'

function useForecast() {
  const { setForecast, setLoading, setError } = useContext(AppContext)

  function getForecast(location) {
    setForecast({})
    setLoading(true)

    fetchCoordinates(location).then((res) => {
      if (res.length === 0) {
        setError("Can't find weather forecast for this location")
      } else {
        const coordinates = res[0].coordinates
        const name = `${res[0].name}, ${res[0].country.name}`

        fetchForecast(coordinates).then((res) => {
          res.name = name
          setForecast(res)
          setLoading(false)
        })
      }
    })
  }

  return { getForecast }
}

export { useForecast }
