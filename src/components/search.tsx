import React, { useState, useEffect } from 'react'

//Logo
import tvLogo from '../assets/tvLogo.png'

//Types
import SearchResultTypes from '../interfaces/SearchResultTypes'

export interface Search {
  query?: string
}

//TS needs a specified form element
export interface FormElement extends HTMLFormControlsCollection {
  searchInput: HTMLInputElement
}

export interface SearchForm extends HTMLFormElement {
  readonly elements: FormElement
}

//Components
import SearchResult from './SearchResult'
import searchService from '../services/searchService'
import Loading from './loading'

const Search: React.FC<Search> = ({ query }): JSX.Element => {
  //States
  const [searchQuery, setSearchQuery] = useState<string>(query ? '' : '')
  const [searchResult, setSearchResult] = useState<Promise<SearchResultTypes>>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleFormSubmit = (e: React.FormEvent<SearchForm>) => {
    e.preventDefault()
    const submitValue = e.currentTarget.elements.searchInput.value

    if (submitValue.length < 1) {
      return
    }

    setSearchQuery(submitValue)
  }

  useEffect(() => {
    searchQuery && handleGetSearch()
  }, [searchQuery])

  const handleGetSearch = async () => {
    setLoading(true)
    const result = await searchService(searchQuery)
    if (result) {
      setLoading(false)
      setSearchResult(result)
    }
  }

  return (
    <>
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
              ></input>
              <button type='submit' className='search-Btn'>
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        searchResult && (
          <SearchResult
            response={searchResult}
            loading={loading}
          ></SearchResult>
        )
      )}
    </>
  )
}

export default Search
