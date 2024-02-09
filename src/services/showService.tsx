import axios, { AxiosResponse } from 'axios'
import { SearchObject } from '../interfaces/SearchObject'

const getShowService = async (query: string): Promise<AxiosResponse<SearchObject>> => {
  try {
    const response: AxiosResponse<SearchObject> = await axios.get(`https://api.tvmaze.com/shows/${query}`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export default getShowService
