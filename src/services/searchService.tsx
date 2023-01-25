import React from 'react'
import axios from 'axios'

const searchService = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default searchService
