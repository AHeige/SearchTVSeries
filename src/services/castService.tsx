import React from 'react'
import axios from 'axios'

const castService = async (id: number) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`)
    return response
  } catch (error) {
    console.error(error)
  }
}

export default castService
