import React from 'react'
import PropTypes from 'prop-types'

import './DailyForecastItem.css'

const DailyForecastItem = ({ item }) => {
  const celsius = '\u00B0'

  return (
    <div className="daily-item">
      <p>{new Date(item.dt * 1000).toLocaleString('en-US', {
        weekday: 'short'
      })}</p>
      <img className="weather-icons" src={`icons/${item.weather[0].icon}.svg`} alt={item.weather[0].description} />
      <p className="weather-day-description">{item.weather[0].description}</p>
      <p>{`Min ${Math.floor(item.temp.min)}${celsius}`}</p>
      <p>{`Max ${Math.floor(item.temp.max)}${celsius}`}</p>
    </div>
  )
}

DailyForecastItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default DailyForecastItem
