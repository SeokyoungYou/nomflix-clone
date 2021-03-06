const API_KEY = "63527560ca78326be8a203622e8cca0c";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
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
export interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

export interface IGetTvResult {
  page?: number;
  results: ITv[];
  total_pages?: number;
  total_results?: number;
}
export interface IGetMoviesResult {
  page?: number;
  results: IMovie[];
  total_pages?: number;
  total_results?: number;
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
export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getLatestTv() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function searchMovies(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
export function searchTvs(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
