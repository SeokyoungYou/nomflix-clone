import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  IGetMoviesResult,
  IGetTvResult,
  searchMovies,
  searchTvs,
} from "../api";

const Wrapper = styled.div`
  padding: 50px;
  width: 100%;
`;
const Title = styled.h1`
  margin-top: 30px;
  font-size: 24px;
`;
function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
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
      <Title>Movies</Title>

      <Title>TV Shows</Title>
    </Wrapper>
  );
}
export default Search;
