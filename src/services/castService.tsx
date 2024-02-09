import axios from 'axios'

const castService = async (id: number) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export default castService
