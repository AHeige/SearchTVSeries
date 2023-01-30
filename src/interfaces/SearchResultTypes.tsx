import React from 'react'
import { SearchObject } from './SearchObject'

export default interface SearchResultTypes {
  response: Promise<SearchObject[]>
  loading: boolean
  setClickedShow: React.Dispatch<React.SetStateAction<SearchObject | undefined>>
}
