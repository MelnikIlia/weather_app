import React from 'react'
import PropTypes from 'prop-types'

import './Error.css'

const Error = ({ error }) => {
  return (
    <div className="text-center animate__animated animate__fadeIn">
      <span className="error">{error}</span>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired
}

export default Error
