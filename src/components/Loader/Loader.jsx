import React from 'react'

const Loader = () => {
  return (
    <div className="spinner-border text-light align-self-center" style={{ width: 5 + 'rem', height: 5 + 'rem' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Loader
