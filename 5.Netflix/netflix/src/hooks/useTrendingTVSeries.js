import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrendingTVSeries = () => {
  return api.get("/trending/tv/week?language=ko");
};

const selectData = (data) => {
  return data.data.results;
};

export const useTrendingTVSeriesQuery = () => {
  return useQuery({
    queryKey: ["trending-TV-series"],
    queryFn: fetchTrendingTVSeries,
    select: selectData,
  });
};
