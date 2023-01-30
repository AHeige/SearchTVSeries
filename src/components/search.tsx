import React, { useState, useEffect } from 'react'

//Logo
import tvLogo from '../assets/tvLogo.png'

//TS needs a specified form element
export interface FormElement extends HTMLFormControlsCollection {
  searchInput: HTMLInputElement
}

export interface SearchForm extends HTMLFormElement {
  readonly elements: FormElement
}

//Interfaces
import { SearchObject } from '../interfaces/SearchObject'

//Services
import searchService from '../services/searchService'

//Components
import Loading from './loading'
import SearchResult from './SearchResult'
import ShowCard from './ShowCard'

const Search: React.FC = (): JSX.Element => {
  //States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Promise<SearchObject[]>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [clickedShow, setClickedShow] = useState<SearchObject>()
  const [showDetails, setShowDetails] = useState<boolean>(false)

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
        searchResult &&
        !clickedShow && (
          <SearchResult
            response={searchResult}
            loading={loading}
            setClickedShow={setClickedShow}
          ></SearchResult>
        )
      )}
      {clickedShow && (
        <ShowCard clickedShow={clickedShow} setShowDetails={setShowDetails} />
      )}
    </>
  )
}

export default Search
