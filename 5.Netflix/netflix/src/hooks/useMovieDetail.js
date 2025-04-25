import { useQueries, useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMovieDetailQuery = (movieId) => {
  //   console.log("movieId", movieId);
  //   const result = useQueries([
  return useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => {
      return api.get(
        `/movie/${movieId}?append_to_response=videos%2Crecommendations&language=ko`
      );
    },
    select: (data) => data.data,
    retry: 1,
  });
  //     {
  //       queryKey: ["movie-reviews", movieId],
  //       queryFn: () => {
  //         return api.get(`/movie/${movieId}/reviews?language=en-US&page=1`);
  //       },
  //       select: (data) => data?.data,
  //     },
  //   ]);

  //   const detail = result[0]?.data || null;
  //   const reviews = result[1]?.data || null;

  //   return { detail, reviews };
};
