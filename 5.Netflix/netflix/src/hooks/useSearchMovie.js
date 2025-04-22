import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = (query, page) => {
  return query
    ? api.get(`/search/movie?language=ko&query=${query}&page=${page}`)
    : api.get(`/movie/popular?language=ko&page=${page}`);
};

export const useSearchMovieQuery = (query, page) => {
  return useQuery({
    queryKey: ["search-movie", query, page],
    queryFn: () => fetchSearchMovie(query, page),
    select: (data) => data.data,
  });
};
