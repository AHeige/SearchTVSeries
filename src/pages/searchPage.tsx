import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

//Interfaces
import { SearchObject } from '../interfaces/SearchObject'
import { SearchForm } from '../interfaces/Search'

//Services
import searchShowsService from '../services/searchService'
import getShowService from '../services/showService'

//Components
import Loading from '../components/loading'
import SearchResult from '../components/SearchResult'
import ShowCard from '../components/ShowCard'
import Header from '../components/Header'

//Utils
import { getSearchParams } from '../utils/SearchParams'

const SearchPage: React.FC = () => {
  //States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<SearchObject[]>()
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

    try {
      const result = await searchShowsService(search)
      setSearchResult(result.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleChosenShow = (chosenShow: SearchObject) => {
    setChosenShow(chosenShow)

    const chosenShowID = chosenShow.show.id.toString()

    setSearchParams({ showID: chosenShowID })
  }

  const getChosenShow = async (search: string) => {
    setLoading(true)

    try {
      const response = await getShowService(search)
      setLoading(false)
      setChosenShow(response.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!chosenShow && searchResult) {
      setSearchParams({ search: searchQuery })
    }
  }, [chosenShow])

  return (
    <>
      <Header hasSearched={hasSearced} searchQuery={searchQuery} handleFormSubmit={handleFormSubmit} />
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
            <SearchResult searchResult={searchResult} loading={loading} handleChosenShow={handleChosenShow}></SearchResult>
          </div>
        )
      )}
      {chosenShow && searchResult && <ShowCard clickedShow={chosenShow} setChosenShow={setChosenShow} searchResult={searchResult} />}
    </>
  )
}

export default SearchPage
