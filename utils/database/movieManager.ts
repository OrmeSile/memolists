import prisma from "@/utils/database/databaseClient";
import {Movie} from ".prisma/client";
import {fetchMoviesByTitle} from "@/utils/database/movieApiFetcher";

export const getMoviesbyTitle = async (title: string) => {
  const localMovies = await prisma.movie.findMany({
    where: {
      original_title: {
        contains: title,
        mode: "insensitive"
      }
    },
    orderBy: {
      popularity: 'desc'
    }
  })
  if (localMovies.length) return localMovies
  const response = await fetchMoviesByTitle(title)
  const fetchedMovies = await response.json()
  if (fetchedMovies.length) return saveMoviesToDb(fetchedMovies.results)
  return []
}

export const saveMoviesToDb = async (movies: Movie[]) => {
  const formattedMovies = movies.map((movie) => {
    const {
      imdb_id,
      tmdb_id,
      backdrop_path,
      poster_path,
      original_title,
      release_date,
      adult,
      popularity
    } = {
      ...movie,
      tmdb_id: parseInt(movie.id)
    }
    return {
      imdb_id,
      tmdb_id,
      backdrop_path,
      poster_path,
      original_title,
      release_date: release_date
        ? new Date(release_date).toISOString()
        : undefined,
      adult,
      popularity
    }
  })
  return prisma.movie.createMany({
    data: formattedMovies
  });
}