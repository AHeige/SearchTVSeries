import React, { useState, useEffect } from 'react'

//Interfaces
import SearchResultTypes from '../interfaces/SearchResultTypes'
import { SearchObject } from '../interfaces/SearchObject'
import { CastType } from '../interfaces/CastType'

//Components
import Loading from './loading'
import GetImage from './ShowImage'

type Result = SearchObject[]

const SearchResult = ({
  response,
  loading,
  setClickedShow,
}: SearchResultTypes): JSX.Element => {
  //States
  const [isLoading, setIsLoading] = useState<boolean>(loading)

  const results: Result = Object.values(response)

  const handleClickedShow = (values: SearchObject) => {
    setClickedShow(values)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div className='show-card-wrapper'>
          {isLoading ? (
            <Loading />
          ) : (
            results.map((values, i) => {
              const show = values.show

              return (
                <div
                  className='show-card-item'
                  onClick={() => handleClickedShow(values)}
                  key={i}
                >
                  <GetImage searchObject={values} />
                  <h4>{show.name}</h4>
                  {show.rating.average && (
                    <p>Rating: {show.rating.average + '/10'}</p>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default SearchResult
