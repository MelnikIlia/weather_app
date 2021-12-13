import React, { Suspense } from 'react'
import { AppContext } from '../../AppContext'

import SearchCityContainer from '../../containers/SearchCityContainer'
import './Page.css'

const Loader = React.lazy(() => import('../../components/Loader/Loader'))
const ShowError = React.lazy(() => import('../../components/ShowError/ShowError'))
const Forecast = React.lazy(() => import('../../components/Forecast/Forecast'))

const Page = () => {
  return (
    <div className="page">
      <div className="page__container container">
        <SearchCityContainer />
        <AppContext.Consumer>
          {({ forecast, location, error, isLoading }) => {
            const isForecast = Object.keys(forecast).length > 0

            return (
              <div className="d-flex flex-column py-5">
                <Suspense fallback={null}>
                  {isLoading && <Loader />}
                  {error && <ShowError error={error} />}
                  {isForecast && <Forecast forecast={forecast} location={location} />}
                </Suspense>
              </div>
            )
          }}
        </AppContext.Consumer>
      </div>
    </div>
  )
}

export default Page
