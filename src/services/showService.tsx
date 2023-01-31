import React from 'react'
import axios from 'axios'

const showService = async (query: string) => {
  try {
    const response = axios.get(`https://api.tvmaze.com/shows/${query}`)
    return response
  } catch (error) {
    console.error(error)
  }
}

export default showService
