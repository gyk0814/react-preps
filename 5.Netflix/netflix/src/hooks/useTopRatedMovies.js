import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get("/movie/top_rated?language=ko&page=1&region=kr");
};

const selectData = (data) => {
  return data.data.results
    .map((item) => ({
      ...item,
      score: Math.round(item.popularity * item.vote_count),
    }))
    .sort((a, b) => b.score - a.score);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: fetchTopRatedMovies,
    select: selectData,
  });
};
