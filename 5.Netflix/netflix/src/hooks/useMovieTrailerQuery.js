import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMovieTrailerQuery = (movieId, type) => {
  return useQuery({
    queryKey: ["movie-trailer", movieId, type],
    queryFn: () => {
      return api.get(`/${type}/${movieId}/videos?language=ko`);
    },
    select: (data) => {
      console.log("trailer data", data);
      return data.data.results[0]?.key;
    },
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
