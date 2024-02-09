import React from 'react'

//Interfaces
import { SearchObject } from '../interfaces/SearchObject'

//Components
import Loading from './loading'
import GetImage from './ShowImage'

interface Props {
  searchResult: SearchObject[]
  loading: boolean
  handleChosenShow: (chosenShow: SearchObject) => void
}

const SearchResult: React.FC<Props> = ({ searchResult: response, loading, handleChosenShow }) => {
  //States

  const results: SearchObject[] = Object.values(response)

  const handleClickedShow = (values: SearchObject) => {
    handleChosenShow(values)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        <div className='show-card-wrapper'>
          {loading ? (
            <Loading />
          ) : (
            results.map((values, i) => {
              const show = values.show

              return (
                <div className='show-card-item' onClick={() => handleClickedShow(values)} key={i}>
                  <GetImage searchObject={values} />
                  <h4>{show.name}</h4>
                  {show.rating.average && <p>Rating: {show.rating.average + '/10'}</p>}
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
