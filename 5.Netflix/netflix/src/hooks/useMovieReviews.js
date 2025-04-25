import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => {
      return api.get(`/movie/${movieId}/reviews?language=en-US&page=1`);
    },
    select: (data) => data.data,
    retry: 1,
  });
};
