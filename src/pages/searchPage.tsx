import React, { useState, useEffect } from 'react'

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
import Loading from '../components/loading'
import SearchResult from '../components/SearchResult'
import ShowCard from '../components/ShowCard'
import Header from '../components/Header'

const SearchPage: React.FC = (): JSX.Element => {
  //States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Promise<SearchObject[]>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [clickedShow, setClickedShow] = useState<SearchObject>()

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
      <Header searchQuery={searchQuery} handleFormSubmit={handleFormSubmit} />
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
        <ShowCard clickedShow={clickedShow} setClickedShow={setClickedShow} />
      )}
    </>
  )
}

export default SearchPage
