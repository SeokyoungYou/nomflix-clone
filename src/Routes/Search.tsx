import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  IGetMoviesResult,
  IGetTvResult,
  searchMovies,
  searchTvs,
} from "../api";
import MovieSlider from "../Components/Movies/MovieSlider";
import TvSlider from "../Components/Tvs/TvSlider";

const Wrapper = styled.div`
  padding: 50px;
  margin-top: 100px;
  width: 100%;
`;
const SliderWrapper = styled.div`
  margin-top: 50px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: movie, isLoading: movieLoading } = useQuery<IGetMoviesResult>(
    ["movie", "search"],
    () => searchMovies(keyword)
  );
  const { data: tv, isLoading: tvLoading } = useQuery<IGetTvResult>(
    ["tv", "search"],
    () => searchTvs(keyword)
  );
  return (
    <Wrapper>
      <SliderWrapper>
        {movie ? (
          <MovieSlider
            data={movie}
            isLoading={movieLoading}
            sliderString="21"
            slidertitle="Moives"
          />
        ) : null}
      </SliderWrapper>
      <SliderWrapper>
        {tv ? (
          <TvSlider
            data={tv}
            isLoading={tvLoading}
            sliderString="22"
            slidertitle="Tv Shows"
          />
        ) : null}
      </SliderWrapper>
    </Wrapper>
  );
}
export default Search;
