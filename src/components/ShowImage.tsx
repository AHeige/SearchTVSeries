import React, { FC, useState } from 'react'

//Interfaces
import { SearchObject } from '../interfaces/SearchObject'

//Components
import Loading from './loading'

interface Props {
  searchObject: SearchObject
}

const GetImage: FC<Props> = ({ searchObject }): JSX.Element => {
  const [loading, setIsLoading] = useState<boolean>(true)

  const noImg = 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'

  const url = searchObject.show.image ? searchObject.show.image.medium : noImg

  return (
    <>
      <img
        style={{
          display: loading ? 'none' : '',
          width: searchObject.show.image ? '' : '210px',
          height: searchObject.show.image ? '' : '295px',
        }}
        src={url}
        onLoad={() => setIsLoading(false)}
      />

      {loading && (
        <div
          style={{
            width: '210px',
            height: '295px',
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            display: 'flex',
          }}
        >
          <Loading />
        </div>
      )}
    </>
  )
}

export default GetImage
