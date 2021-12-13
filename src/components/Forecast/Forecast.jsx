import React from 'react'
import PropTypes from 'prop-types'
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import DailyForecast from '../DailyForecast/DailyForecast'

const Forecast = ({ forecast, location }) => {
  const currentForecast = {
    forecast: forecast.current,
    name: location.name,
    timezone: forecast.timezone
  }
  const dailyForecast = forecast.daily

  return (
    <div className="animate__animated animate__fadeIn">
      <CurrentForecast currentForecast={currentForecast} />
      <DailyForecast dailyForecast={dailyForecast} />
    </div>
  )
}

Forecast.propTypes = {
  forecast: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Forecast
