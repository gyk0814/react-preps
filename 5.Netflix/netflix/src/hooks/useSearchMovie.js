import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = (query, page, sort, genre) => {
  return query
    ? api.get(`/search/movie?language=ko&query=${query}&page=${page}`)
    : api.get(
        `/discover/movie?include_adult=false&include_video=false&language=ko&page=${page}&sort_by=${sort}&with_genres=${genre}`
      );
};

export const useSearchMovieQuery = (query, page, sort, genre) => {
  return useQuery({
    queryKey: ["search-movie", query, page, sort, genre],
    queryFn: () => fetchSearchMovie(query, page, sort, genre),
    select: (data) => data.data,
    retry: 1,
  });
};
