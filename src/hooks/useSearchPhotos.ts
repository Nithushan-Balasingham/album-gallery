import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

const fetchCollections = async () => {
  const res = await axios.get('https://api.unsplash.com/collections', {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  
  return res.data;  
};

// const fetchPhotosFromCollection = async (collectionId: string) => {
//   const res = await axios.get(`https://api.unsplash.com/collections/${collectionId}/photos`, {
//     headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
//   });

//   return res.data; 
// };

const fetchPhotos = async (query: string) => {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, per_page: 10 },
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  return res.data.results;  
};

export const useSearchPhotos = (query: string | null) => {
  return useQuery({
    queryKey: ['searchPhotos', query],
    queryFn: () => {
      if (query) {
        return fetchPhotos(query); 
      } else {
        return fetchCollections();  
      }
    },
    enabled: true,  
  });
};
