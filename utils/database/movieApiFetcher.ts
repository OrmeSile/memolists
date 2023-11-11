const apiKey = process.env.TMDB_TOKEN!
const baseUrl = process.env.TMDB_BASEURL!
export const fetchMoviesByTitle = async (title: string) => {
  return await fetch(`${baseUrl}/search/movie?query=${title}&include_adult=true&page=1`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  })
}

const fetchMovieByImdbId = (title: string) => {

}
