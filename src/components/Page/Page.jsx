import React, { Suspense, useContext } from 'react'
import { AppContext } from '../../AppContext'
import { isObjectEmpty } from '../../lib/checkFunctions'

import SearchCityContainer from '../../containers/SearchCityContainer'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'

import './Page.css'

const Forecast = React.lazy(() => import('../../components/Forecast/Forecast'))

const Page = () => {
  const { forecast, error, isLoading } = useContext(AppContext)

  return (
    <div className="page">
      <div className="page__container container">
        <SearchCityContainer />
        <div className="d-flex flex-column py-5">
          <Suspense fallback={null}>
            {isLoading && <Loader />}
            {error && <ShowError error={error} />}
            {!isObjectEmpty(forecast) && <Forecast forecast={forecast} />}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page
