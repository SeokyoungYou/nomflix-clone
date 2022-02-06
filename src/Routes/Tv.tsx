import { useQuery } from "react-query";
import {
  getAiringTodayTv,
  getLatestTv,
  getPopularTv,
  getTopRatedTv,
  IGetTvResult,
  ITv,
} from "../api";
import SingleTv from "../Components/Tvs/SingleTv";
import TvBanner from "../Components/Tvs/TvBanner";
import TvSlider from "../Components/Tvs/TvSlider";
function Home() {
  const { data: popular, isLoading: popularLoading } = useQuery<IGetTvResult>(
    ["tvs", "popular"],
    getPopularTv
  );
  const { data: airingToday, isLoading: airingTodayLoading } =
    useQuery<IGetTvResult>(["tvs", "airingToday"], getAiringTodayTv);
  const { data: topRated, isLoading: topRatedLoading } = useQuery<IGetTvResult>(
    ["tvs", "TopRated"],
    getTopRatedTv
  );
  const { data: latest, isLoading: LatestLoading } = useQuery<ITv>(
    ["tv", "lateset"],
    getLatestTv
  );
  return (
    <>
      {popular ? (
        <>
          <TvBanner data={popular} isLoading={popularLoading} />
          <TvSlider
            data={popular}
            isLoading={popularLoading}
            sliderString="11"
            slidertitle="Popular TVs"
          />
        </>
      ) : null}
      {airingToday && (
        <TvSlider
          data={airingToday}
          isLoading={airingTodayLoading}
          sliderString="12"
          slidertitle="Airing Today TVs"
        />
      )}
      {topRated && (
        <TvSlider
          data={topRated}
          isLoading={topRatedLoading}
          sliderString="13"
          slidertitle="Top Rated TVs"
        />
      )}
      {latest && (
        <SingleTv
          data={latest}
          isLoading={LatestLoading}
          sliderString="14"
          slidertitle="Latest TV"
        />
      )}
    </>
  );
}
export default Home;
