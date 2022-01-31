/* eslint-disable no-undef */
import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import SearchCityForm from '../SearchCityForm.jsx'

const RandomInt = () => Math.floor(Math.random() * 1000)

const suggestions = [
  {
    id: RandomInt(),
    name: 'Paris'
  },
  {
    id: RandomInt(),
    name: 'New Orleans'
  },
  {
    id: RandomInt(),
    name: 'Parintins'
  },
  {
    id: RandomInt(),
    name: 'Cormeilles-en-Parisis'
  },
  {
    id: RandomInt(),
    name: 'La Defense'
  },
  {
    id: RandomInt(),
    name: 'Kingston'
  }
]

beforeEach(() => {})

afterEach(cleanup)

describe('Component SearchCityForm', function () {
  it('Should rendering', () => {
    render(<SearchCityForm />)

    expect(screen.getByRole('form', { name: 'search city form' })).toBeInTheDocument()
  })

  it('Should update value after changing input value', async () => {
    const SearchCityContainer = () => {
      const [cityName, setCityName] = useState('')
      return <SearchCityForm cityName={cityName} setCityName={setCityName} suggestions={suggestions} />
    }

    render(<SearchCityContainer />)

    fireEvent.change(screen.getByPlaceholderText('Search city'), {
      target: {
        value: 'Pari'
      }
    })

    await expect(screen.getByPlaceholderText('Search city')).toHaveDisplayValue('Pari')
  })

  it('Should display suggestions after entering a value in the search field', async () => {
    const SearchCityContainer = () => {
      const [cityName, setCityName] = useState('')
      return <SearchCityForm cityName={cityName} setCityName={setCityName} suggestions={suggestions} />
    }

    render(<SearchCityContainer />)

    const input = screen.getByPlaceholderText('Search city')

    fireEvent.change(input, {
      target: {
        value: 'Pari'
      }
    })

    fireEvent.keyDown(input)

    await expect(screen.getByText('Paris')).toBeInTheDocument()
  })
})
