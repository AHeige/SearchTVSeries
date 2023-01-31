import React, { FC, useState } from 'react'

//Utils
import GetImage from './ShowImage'

//Interfaces
import { SearchObject } from '../interfaces/SearchObject'
import CastCard from './CastCard'

interface Props {
  clickedShow: SearchObject
  setClickedShow: React.Dispatch<React.SetStateAction<SearchObject | undefined>>
}

const ShowCard: FC<Props> = ({ clickedShow, setClickedShow }): JSX.Element => {
  return (
    clickedShow && (
      <div className='show-details'>
        <div onClick={() => setClickedShow(undefined)} className='go-back-box'>
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
                dangerouslySetInnerHTML={{
                  __html: clickedShow.show.summary,
                }}
              />
            </div>
          </div>
          <div>
            <GetImage searchObject={clickedShow} />
          </div>
        </div>
        <CastCard values={clickedShow} />
      </div>
    )
  )
}

export default ShowCard
