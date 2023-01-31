export const getSearchParams = (params: URLSearchParams) => {
  const searchParams = params.get('search')
  const showParams = params.get('showID')

  return { searchParams, showParams }
}
