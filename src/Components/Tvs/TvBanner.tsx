import styled from "styled-components";
import { IGetTvResult } from "../../api";
import { makeImagePath } from "../../utils";

const Wrapper = styled.div`
  background-color: black;
  z-index: -1;
`;
const Loader = styled.div`
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;
interface ITvBanner {
  data: IGetTvResult | undefined;
  isLoading: boolean | undefined;
}
function TvBanner({ data, isLoading }: ITvBanner) {
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
export default TvBanner;
