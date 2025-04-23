import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

const fetchCollections = async (query: string, page: number, perPage: number) => {
  const res = await axios.get("https://api.unsplash.com/collections", {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    params: {
      page,
      per_page: perPage,
      query,
    },
  });
  return res.data;
};
const fetchImages = async (query: string, page: number, perPage: number) => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    params: {
      query,
      page,
      per_page: perPage,
    },
  });
  return res.data.results;
};
export const useSearchPhoto = (query: string, page: number, perPage: number) => {
  return useQuery({
    queryKey: ["searchPhoto", query, page, perPage],
    queryFn: () => fetchImages(query, page, perPage),
    enabled: true,
  });
};
export const useSearchPhotos = (query: string, page: number, perPage: number) => {
  return useQuery({
    queryKey: ["searchPhotos", query, page, perPage],
    queryFn: () => fetchCollections(query, page, perPage),
    enabled: true,
  });
};


const fetchAlbumDetails = async (albumId: string) => {
  const res = await axios.get(`https://api.unsplash.com/collections/${albumId}`, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  return res.data;
};

export const useAlbumDetails = (albumId: string) => {
  return useQuery({
    queryKey: ["albumDetails", albumId],
    queryFn: () => fetchAlbumDetails(albumId),
    enabled: !!albumId, 
  });
};
