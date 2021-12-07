import React from 'react'
import PropTypes from 'prop-types'

import './CurrentForecast.css'

function CurrentForecast({ currentForecast }) {
  const celsius = '\u00B0'

  const { name, timezone, forecast } = currentForecast

  return (
    <div className="current-forecast row">
      <div className="col-sm-12 col-md-8 col-lg-4 align-self-center">
        <h2>{name}</h2>
        <h3 className="display-5 date-text">
          {new Date(forecast.dt * 1000).toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric'
          })}
        </h3>
      </div>

      <div className="col-sm-12 col-md-8 col-lg-4 align-self-center">
        <img src={`icons/${forecast.weather[0].icon}.svg`} alt={forecast.weather[0].description} />
        <p className="condition-text">{forecast.weather[0].description}</p>
        <div className="sun-schedule">
          <img src={'icons/sunrise.svg'} alt="sunrise" />
          <p>
            {new Date(forecast.sunrise * 1000).toLocaleString('en-US', {
              timeZone: timezone,
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            })}
          </p>
        </div>
        <div className="sun-schedule">
          <img src={'icons/sunset.svg'} alt="sunset" />
          <p>
            {new Date(forecast.sunset * 1000).toLocaleString('en-US', {
              timeZone: timezone,
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            })}
          </p>
        </div>
      </div>

      <div className="col-sm-12 col-md-8 col-lg-4 align-self-center">
        <h2 className="display-3">{`${Math.floor(forecast.temp)}${celsius}`}</h2>
        <div className="row">
          <div className="col-6 current-forecast-details">
            Feels like {`${Math.floor(forecast.feels_like)}${celsius}`}
          </div>
          <div className="col-6 current-forecast-details">Wind speed {forecast.wind_speed}</div>
          <div className="col-6 current-forecast-details">Pressure {forecast.pressure}</div>
          <div className="col-6 current-forecast-details">Humidity {forecast.humidity}</div>
          <div className="col-6 current-forecast-details">Cloudity {forecast.clouds}</div>
          <div className="col-6 current-forecast-details">UV {forecast.uvi}</div>
        </div>
      </div>
    </div>
  )
}

CurrentForecast.propTypes = {
  currentForecast: PropTypes.object.isRequired
}

export default CurrentForecast
