import React from 'react'
import { AppContext } from '../../AppContext'

import SearchCityContainer from '../../containers/SearchCityContainer'
import Loader from '../../components/Loader/Loader'
import Error from '../../components/Error/Error'
import Forecast from '../../components/Forecast/Forecast'

import './Page.css'

const Page = () => {
  return (
    <div className="page">
      <div className="page__container container">
        <SearchCityContainer />
        <AppContext.Consumer>
          {({ forecast, error, isLoading }) => {
            const isForecast = Object.keys(forecast).length > 0

            return (
              <div className="d-flex flex-column py-5">
                {isLoading && <Loader />}
                {error && <Error error={error} />}
                {isForecast && <Forecast forecast={forecast} />}
              </div>
            )
          }}
        </AppContext.Consumer>
      </div>
    </div>
  )
}

export default Page
