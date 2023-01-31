import React from 'react'
import axios from 'axios'
import { SearchObject } from '../interfaces/SearchObject'

const searchService = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    )
    return response
  } catch (error) {
    console.error(error)
  }
}

export default searchService
