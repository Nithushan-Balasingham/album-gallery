import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

export const addImageToAlbum = async (albumId: string, photoId: string) => {
  const res = await axios.post(
    `https://api.unsplash.com/collections/${albumId}/add`,
    {
      photo_ids: photoId, 
    },
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );
  return res.data;
};

