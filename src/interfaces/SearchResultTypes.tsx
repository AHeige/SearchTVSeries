import React from 'react'
import { SearchObject } from './SearchObject'

export default interface SearchResultTypes {
  searchResult: Promise<SearchObject[]>
  loading: boolean
  handleChosenShow: (chosenShow: SearchObject) => void
}
