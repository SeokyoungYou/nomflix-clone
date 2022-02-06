import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getLatestMovie,
  getMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMoviesResult,
  IMovie,
} from "../api";
import MovieBanner from "../Components/Movies/MovieBanner";
import MovieSlider from "../Components/Movies/MovieSlider";
import SingleMovie from "../Components/Movies/SingleMovie";
function Home() {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovie);
  const { data: upcoming, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcoming"], getUpcomingMovie);
  const { data: latest, isLoading: LatestLoading } = useQuery<IMovie>(
    ["tv", "lateset"],
    getLatestMovie
  );
  return (
    <>
      {nowPlaying ? (
        <>
          <MovieBanner data={nowPlaying} isLoading={nowPlayingLoading} />
          <MovieSlider
            data={nowPlaying}
            isLoading={nowPlayingLoading}
            sliderString="1"
            slidertitle="Now Playing Movies"
          />
        </>
      ) : null}
      {topRated && (
        <MovieSlider
          data={topRated}
          isLoading={topRatedLoading}
          sliderString="2"
          slidertitle="Top Rated Movies"
        />
      )}
      {upcoming && (
        <MovieSlider
          data={upcoming}
          isLoading={upcomingLoading}
          sliderString="3"
          slidertitle="Upcoming Movies"
        />
      )}
      {latest && (
        <SingleMovie
          data={latest}
          isLoading={LatestLoading}
          sliderString="4"
          slidertitle="Latest Movie"
        />
      )}
    </>
  );
}
export default Home;
