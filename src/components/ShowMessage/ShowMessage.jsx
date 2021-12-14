import React from 'react'
import PropTypes from 'prop-types'

const ShowMessage = ({ message }) => {
  return (
    <div className="text-center pb-4 animate__animated animate__fadeIn">
      <span className="show-error">{message}</span>
    </div>
  )
}

ShowMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default ShowMessage
