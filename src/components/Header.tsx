import React, { FC } from 'react'

//Assets
import tvLogo from '../assets/tvLogo.png'

interface Props {
  searchQuery: string
  handleFormSubmit: (e: React.FormEvent<SearchForm>) => void
}

//TS needs a specified form element
export interface FormElement extends HTMLFormControlsCollection {
  searchInput: HTMLInputElement
}

export interface SearchForm extends HTMLFormElement {
  readonly elements: FormElement
}

const Header: FC<Props> = ({ searchQuery, handleFormSubmit }) => {
  return (
    <div className={searchQuery.length > 1 ? 'header' : 'header-startup'}>
      <div className='header-item'>
        <img src={tvLogo} alt='logo'></img>
      </div>
      <div className='header-item'>
        <div className='search'>
          <form
            style={{ display: 'flex' }}
            id='form'
            onSubmit={handleFormSubmit}
          >
            <input
              id='searchInput'
              type='text'
              placeholder='Search for TV shows'
              className='search-input'
              defaultValue={searchQuery ? searchQuery : undefined}
            ></input>
            <button type='submit' className='search-Btn'>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Header
