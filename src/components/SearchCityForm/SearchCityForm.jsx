import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'
import { MIN_AMOUNT_CHARS_TO_SEARCH } from '../../constants/constants'

import './SearchCityForm.css'

const SearchCityForm = ({ cityName, setCityName, suggestions, onSubmit }) => {
  return (
    <form
      className="form text-center"
      onSubmit={onSubmit}
      name="search-city-form"
      role="form"
      aria-label="search city form">
      <div className="search-box">
        <Autocomplete
          value={cityName}
          items={(() => {
            if (cityName?.length > MIN_AMOUNT_CHARS_TO_SEARCH - 1) {
              return [...suggestions?.sort((a, b) => (a.name > b.name ? 1 : -1))]
            }
            return []
          })()}
          getItemValue={(item) => item.name}
          renderMenu={(item) => <div className="dropdown">{item}</div>}
          renderItem={(item, isHighlighted) => (
            <div className={`item ${isHighlighted ? 'selected-item' : ''}`} key={item.id}>
              {item.name}
            </div>
          )}
          onChange={(e) => setCityName(e.target.value)}
          onSelect={(value) => setCityName(value)}
          inputProps={{ placeholder: 'Search city' }}
        />
        <button className="form__button" type="submit">
          <img src="icons/search.svg" />
        </button>
      </div>
    </form>
  )
}

SearchCityForm.propTypes = {
  cityName: PropTypes.string,
  setCityName: PropTypes.func,
  suggestions: PropTypes.array,
  onSubmit: PropTypes.func
}

export default SearchCityForm
