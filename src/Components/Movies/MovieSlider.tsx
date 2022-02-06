import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getLatestMovie,
  getMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetLatestMoviesResult,
  IGetMoviesResult,
} from "../../api";
import { makeImagePath } from "../../utils";
import {
  motion,
  AnimatePresence,
  animate,
  useViewportScroll,
} from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { sliderNumAtom } from "../../atom";

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
const Slider = styled.div`
  position: relative;
  top: -100px;
  height: 250px;
  margin-bottom: 20px;
  z-index: 0;
`;
const SliderTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  padding: 10px;
  font-weight: 500;
`;
const SliderHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const SliderBtn = styled.button`
  width: 30px;
  height: 30px;
  font-size: 25px;
  border-radius: 15px;
  border-style: none;
  margin-left: 10px;
  padding-top: 2px;
  margin-top: 8px;
  cursor: pointer;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const BoxImg = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
    color: white;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 2;
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  z-index: 3;
  background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 40%;
`;
const BigInfoBox = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
`;
const BigInfoVote = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  gap: 10px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  margin-bottom: 50px;
`;
const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
`;
const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),

  visible: (back: boolean) => ({
    x: 0,
  }),
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};
const InfoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};
const offset = 6;
interface IMovieSlider {
  data: IGetMoviesResult;
  isLoading: boolean;
  slidertitle: string;
  sliderString: string;
}
function MovieSlider({
  data,
  isLoading,
  slidertitle,
  sliderString,
}: IMovieSlider) {
  const history = useHistory();
  const { scrollY } = useViewportScroll();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [sliderNum, setSliderNum] = useRecoilState(sliderNumAtom);
  const nextBtnClicked = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1; //except banner movie
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const prevBtnClicked = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = data.results.length - 1; //except banner movie
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    setSliderNum(+sliderString);
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");
  const clickedMoive =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Slider>
            <SliderHeader>
              <SliderTitle>{slidertitle}</SliderTitle>
              <SliderBtn onClick={prevBtnClicked}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </SliderBtn>
              <SliderBtn onClick={nextBtnClicked}>
                <FontAwesomeIcon icon={faAngleRight} />
              </SliderBtn>
            </SliderHeader>
            <AnimatePresence
              initial={false}
              custom={back}
              onExitComplete={toggleLeaving}
            >
              <Row
                custom={back}
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={String(movie.id) + sliderString}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                    >
                      <BoxImg
                        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      />
                      <Info variants={InfoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {sliderNum === +sliderString && bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId + sliderString}
                >
                  {clickedMoive && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMoive.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigInfoBox>
                        <BigTitle>{clickedMoive.title}</BigTitle>
                        <h1>Released date : {clickedMoive.release_date}</h1>
                        <BigInfoVote>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "yellow" }}
                          />
                          <h1>
                            {clickedMoive.vote_average} (
                            {clickedMoive.vote_count})
                          </h1>
                        </BigInfoVote>
                        <BigOverview>{clickedMoive.overview}</BigOverview>
                      </BigInfoBox>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default MovieSlider;
