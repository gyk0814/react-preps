import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchMovieGenres = () => {
  return api.get("/genre/movie/list?language=ko");
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    select: (data) => data.data.genres,
    staleTime: 1000 * 60 * 60,
  });
};
