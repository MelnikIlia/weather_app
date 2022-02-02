import React from 'react'
import ShowMessage from '../ShowMessage/ShowMessage'
import PropTypes from 'prop-types'
import { useForecast } from '../../hooks/useForecast'

const LocationRequest = ({ setLocationRequested }) => {
  const { getCoordinatesByIp } = useForecast()
  const message = 'Enable location detection to get the forecast automatically'

  const handleApproval = () => {
    getCoordinatesByIp()
    setLocationRequested(false)
  }

  const handleDecline = () => {
    setLocationRequested(false)
  }

  return (
    <>
      <ShowMessage message={message} />
      <div className="d-flex gap-4 mx-auto">
        <button className="btn btn-light btn-rounded" onClick={handleApproval} role="button" aria-label="Approve">Approve</button>
        <button className="btn btn-light btn-rounded" onClick={handleDecline} role="button" aria-label="Decline">Decline</button>
      </div>
    </>
  )
}

LocationRequest.propTypes = {
  setLocationRequested: PropTypes.bool
}

export default LocationRequest
