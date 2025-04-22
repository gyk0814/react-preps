import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchTVGenres = () => {
  return api.get("/genre/tv/list?language=ko");
};

export const useTVGenreQuery = () => {
  return useQuery({
    queryKey: ["tv-genres"],
    queryFn: fetchTVGenres,
    select: (data) => data.data.genres,
    staleTime: 1000 * 60 * 60,
  });
};
