import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useUpcomingMovieQuery = () => {
  return useQuery({
    queryKey: ["upcoming-movie"],
    queryFn: () => api.get(`/movie/upcoming?language=ko`),
    select: (data) => data.data.results,
    retry: 1,
  });
};
