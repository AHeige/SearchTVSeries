import React, { useEffect, useState } from 'react'

//Interfaces
import { CastType } from '../interfaces/CastType'
import { SearchObject } from '../interfaces/SearchObject'

//Services
import castService from '../services/castService'

//Components
import Loading from './loading'

interface Props {
  values: SearchObject
}

const CastCard: React.FC<Props> = ({ values }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cast, setCast] = useState<CastType[]>()

  const getCastImage = (castObject: CastType): string => {
    const noImg = 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'

    const url = castObject.character.image ? castObject.character.image.medium : noImg

    return url
  }

  const getCast = async (values: SearchObject) => {
    if (values) {
      setIsLoading(true)
      try {
        const result = await castService(values.show.id)
        setIsLoading(false)
        setCast(result.data)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getCast(values)
  }, [])

  return (
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
                <img alt='Cast' style={{ width: '100%' }} src={getCastImage(values)} />
                <p key={i}>
                  {values.person.name} <br />
                  <span style={{ color: '#cccccc', fontSize: '0.7em' }}>as {values.character.name}</span>
                </p>
              </div>
            ))}
          {((cast && cast.length < 1) || !cast) && <p>No information about cast yet!</p>}
        </div>
      )}
    </div>
  )
}

export default CastCard
