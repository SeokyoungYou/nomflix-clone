const API_KEY = "63527560ca78326be8a203622e8cca0c";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  release_date: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetLatestMoviesResult {
  adult: boolean;
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getLatestMovie() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovie() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getUpcomingMovie() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// On the / (home) page implement sliders for: Latest movies, Top Rated Movies and Upcoming Movies.
// On the /tv page implement sliders for: Latest Shows, Airing Today, Popular, Top Rated.
