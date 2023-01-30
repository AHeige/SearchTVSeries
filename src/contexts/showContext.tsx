import { createContext } from 'react'

export const searchContext = createContext({
  searchObjects: [],
  setSearchObjects: () => {},
})

export const showContext = createContext({
  showObject: [],
  setShowObject: () => {},
})
