import React, { Suspense, useState } from 'react'
import { useStore } from '../../store/store'
import { isObjectEmpty } from '../../lib/checkFunctions'

import SearchCityContainer from '../../containers/SearchCityContainer'
import Loader from '../../components/Loader/Loader'
import ShowError from '../../components/ShowError/ShowError'
import ShowMessage from '../ShowMessage/ShowMessage'
import LocationRequest from '../LocationRequest/LocationRequest'

import './Page.css'

const Forecast = React.lazy(() => import('../../components/Forecast/Forecast'))

const Page = () => {
  const [appState] = useStore()
  const { forecast, isLoading, message, error } = appState

  const { locationStored } = JSON.parse(localStorage.getItem('serviceData')) || false
  const [isLocationRequested, setLocationRequested] = useState(!locationStored)

  return (
    <div className="page">
      <div className="page__container container">
        <SearchCityContainer />
        <div className="d-flex flex-column py-5">
          <Suspense fallback={null}>
            {isLoading && <Loader />}
            {(isLocationRequested && !isLoading) && <LocationRequest setLocationRequested={setLocationRequested} />}
            {error && <ShowError error={error} />}
            {message && <ShowMessage message={message} />}
            {!isObjectEmpty(forecast) && <Forecast forecast={forecast} />}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page
