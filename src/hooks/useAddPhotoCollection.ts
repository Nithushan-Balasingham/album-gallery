// hooks/useAddPhotoToCollection.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const UNSPLASH_API = 'https://api.unsplash.com';
const ACCESS_TOKEN = '<your_access_token>';

export const useAddPhotoToCollection = () => {
  return useMutation(async ({ collectionId, photoId }: { collectionId: string; photoId: string }) => {
    const response = await axios.post(
      `${UNSPLASH_API}/collections/${collectionId}/add`,
      { photo_id: photoId },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  });
};
