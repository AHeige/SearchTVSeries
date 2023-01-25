import React, { useState, useEffect } from 'react'

//Interfaces
import SearchResultTypes from '../interfaces/SearchResultTypes'
import { SearchObject } from '../interfaces/SearchObject'
import { CastType } from '../interfaces/CastType'

//Components
import Loading from './loading'

//Services
import castService from '../services/castService'

type Result = SearchObject[]

const SearchResult = ({
  response,
  loading,
}: SearchResultTypes): JSX.Element => {
  useEffect(() => {
    setShowDetails(false)
  }, [response])

  //States
  const [clickedShow, setClickedShow] = useState<SearchObject>()
  const [showDetails, setShowDetails] = useState<boolean>()
  const [cast, setCast] = useState<CastType[]>()
  const [isLoading, setIsLoading] = useState<boolean>(loading)

  const results: Result = Object.values(response)

  const handleClickedShow = (values: SearchObject) => {
    setShowDetails(true)
    setClickedShow(values)
    getCast(values)
  }

  const getCast = async (values: SearchObject) => {
    if (values) {
      setIsLoading(true)
      let result: CastType[] = await castService(values.show.id)
      if (result) {
        setIsLoading(false)
        setCast(result)
      }
    }
  }

  const getImage = (searchObject: SearchObject): string => {
    const noImg =
      'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'

    const url = searchObject.show.image ? searchObject.show.image.medium : noImg

    return url
  }

  const getCastImage = (castObject: CastType): string => {
    const noImg =
      'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'

    const url = castObject.character.image
      ? castObject.character.image.medium
      : noImg

    return url
  }

  return (
    <>
      {!showDetails && (
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
                  <img style={{ width: '100%' }} src={getImage(values)} />
                  <h4>{show.name}</h4>
                  {show.rating.average && (
                    <p>Rating: {show.rating.average + '/10'}</p>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}
      {clickedShow && showDetails && (
        <div className='show-details'>
          <div onClick={() => setShowDetails(false)} className='go-back-box'>
            <p>
              <span style={{ fontSize: '17px' }}>&#8592;</span> Back to search
              results
            </p>
          </div>
          <div className='show-card-details'>
            <div className='description'>
              <div className='title'>
                <h1 style={{ marginTop: 0, fontWeight: '600' }}>
                  {clickedShow.show.name}
                </h1>
                {clickedShow.show.rating.average && (
                  <p>Rating: {clickedShow.show.rating.average + '/10'}</p>
                )}
                <p>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>
                    Genres:{' '}
                  </span>
                  {clickedShow.show.genres.length ? (
                    clickedShow.show.genres.map((values, i) => {
                      if (clickedShow.show.genres.length - 1 === i) {
                        return values
                      }

                      return `${values} | `
                    })
                  ) : (
                    <span>No genres</span>
                  )}
                </p>
              </div>
              <div style={{ width: '90%', paddingTop: '0.8em' }}>
                <p
                  dangerouslySetInnerHTML={{ __html: clickedShow.show.summary }}
                />
              </div>
            </div>
            <div>
              <img src={getImage(clickedShow)} />
            </div>
          </div>
          <div className='cast'>
            <h1>Cast</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <div
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridGap: '1.2em',
                  fontSize: '0.8em',
                  fontWeight: '400',
                }}
              >
                {cast &&
                  cast.map((values, i) => (
                    <div
                      className='cast-details'
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '0.5fr 1fr',
                      }}
                    >
                      <img
                        style={{ width: '100%' }}
                        src={getCastImage(values)}
                      />
                      <p key={i}>
                        {values.person.name} <br />
                        <span style={{ color: '#cccccc', fontSize: '0.7em' }}>
                          as {values.character.name}
                        </span>
                      </p>
                    </div>
                  ))}
                {cast && cast.length < 1 && (
                  <p>No information about cast yet!</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchResult
