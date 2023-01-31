import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

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
import showService from '../services/showService'

//Components
import Loading from '../components/loading'
import SearchResult from '../components/SearchResult'
import ShowCard from '../components/ShowCard'
import Header from '../components/Header'

//Utils
import { getSearchParams } from '../utils/SearchParams'

const SearchPage: React.FC = (): JSX.Element => {
  //States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Promise<SearchObject[]>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [chosenShow, setChosenShow] = useState<SearchObject>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [hasSearced, setHasSearched] = useState<boolean>(false)

  const handleFormSubmit = (e: React.FormEvent<SearchForm>) => {
    e.preventDefault()
    const submitValue = e.currentTarget.elements.searchInput.value

    if (submitValue.length <= 1) {
      return
    }
    setChosenShow(undefined)
    setHasSearched(true)
    handleGetSearch(submitValue)
    setSearchQuery(submitValue)
    setSearchParams({ search: submitValue })
  }

  useEffect(() => {
    const params = getSearchParams(searchParams)

    if (params.searchParams || params.showParams) {
      setHasSearched(true)

      if (params.searchParams) {
        handleGetSearch(params.searchParams)
        setSearchQuery(params.searchParams)
      }

      if (params.showParams) {
        getChosenShow(params.showParams)
      }
    }
  }, [])

  const handleGetSearch = async (search: string) => {
    setLoading(true)
    const result = await searchService(search)

    if (result && result.status === 200) {
      setLoading(false)
      setSearchResult(result.data)
    }
  }

  const handleChosenShow = (chosenShow: SearchObject) => {
    setChosenShow(chosenShow)

    const chosenShowID = chosenShow.show.id.toString()

    setSearchParams({ showID: chosenShowID })
  }

  const getChosenShow = async (search: string) => {
    setLoading(true)
    const result = await showService(search)
    if (result && result.status === 200) {
      const show: SearchObject = {
        score: 1,
        show: result.data,
      }
      setLoading(false)
      setChosenShow(show)
    }
  }

  useEffect(() => {
    if (!chosenShow && searchResult) {
      setSearchParams({ search: searchQuery })
    }
  }, [chosenShow])

  return (
    <>
      <Header
        hasSearched={hasSearced}
        searchQuery={searchQuery}
        handleFormSubmit={handleFormSubmit}
      />
      {loading ? (
        <Loading />
      ) : (
        searchResult &&
        !chosenShow && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <SearchResult
              searchResult={searchResult}
              loading={loading}
              handleChosenShow={handleChosenShow}
            ></SearchResult>
          </div>
        )
      )}
      {chosenShow && (
        <ShowCard
          clickedShow={chosenShow}
          setChosenShow={setChosenShow}
          searchResult={searchResult}
        />
      )}
    </>
  )
}

export default SearchPage
