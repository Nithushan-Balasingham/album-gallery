import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define the ACCESS_KEY from environment variable
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

// Fetch collections (albums)
const fetchCollections = async () => {
  const res = await axios.get('https://api.unsplash.com/collections', {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  
  return res.data;  // Return the list of collections (albums)
};

// Fetch photos from a specific collection
const fetchPhotosFromCollection = async (collectionId: string) => {
  const res = await axios.get(`https://api.unsplash.com/collections/${collectionId}/photos`, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  return res.data;  // Return the photos in the collection
};

// Fetch photos based on a search query (for random search, or specific queries)
const fetchPhotos = async (query: string) => {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, per_page: 10 },
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  return res.data.results;  // Return the search results (photos)
};

// Custom hook to fetch either collections or photos based on the query
export const useSearchPhotos = (query: string | null) => {
  // If a query exists, we search for photos; otherwise, we fetch collections
  return useQuery({
    queryKey: ['searchPhotos', query],
    queryFn: () => {
      if (query) {
        return fetchPhotos(query);  // Search photos based on the query
      } else {
        return fetchCollections();  // Fetch collections (albums) if no query
      }
    },
    enabled: true,  // Always enabled to fetch data
  });
};
