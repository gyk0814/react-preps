import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrendingMovies = () => {
  return api.get(
    "/discover/movie?include_adult=false&include_video=false&language=ko&page=1&primary_release_date.gte=2023-01-20&region=KR&release_date.gte=2024-10-20&release_date.lte=2025-04-20&sort_by=vote_count.desc"
  );
};

const selectData = (data) => {
  return data.data.results
    .filter(
      (item) =>
        item.popularity > 31 &&
        new Date(item.release_date) >= new Date("2024-10-20")
    )
    .map((item) => ({
      ...item,
      score: Math.round(item.popularity * item.vote_count),
    }))
    .sort((a, b) => b.score - a.score);
};

export const useTrendingMoviesQuery = () => {
  return useQuery({
    queryKey: ["trending-movies"],
    queryFn: fetchTrendingMovies,
    select: selectData,
  });
};
