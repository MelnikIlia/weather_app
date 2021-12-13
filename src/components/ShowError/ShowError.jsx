import React from 'react'
import PropTypes from 'prop-types'

import './ShowError.css'

const ShowError = ({ error }) => {
  return (
    <div className="text-center animate__animated animate__fadeIn">
      <span className="show-error">{error}</span>
    </div>
  )
}

ShowError.propTypes = {
  error: PropTypes.string.isRequired
}

export default ShowError
