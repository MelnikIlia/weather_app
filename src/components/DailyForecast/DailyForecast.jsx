import React from 'react'
import PropTypes from 'prop-types'
import DailyForecastItem from '../DailyForecastItem/DailyForecastItem'

import './DailyForecast.css'

const DailyForecast = ({ dailyForecast }) => {
  return (
    <div className="daily-forecast-container container text-center">
      <h2 className="display-5 text-start">Next 7 days</h2>
      <div className="daily-forecast-row">
        {dailyForecast.map(function (item, i) {
          return i > 0 && <DailyForecastItem item={item} key={i} />
        })}
      </div>
    </div>
  )
}

DailyForecast.propTypes = {
  dailyForecast: PropTypes.array.isRequired
}

export default DailyForecast
