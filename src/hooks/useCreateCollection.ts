import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

export const addImageToAlbum = async (albumId: string, photoId: string, token:string) => {
console.log(token)
  const res = await axios.post(
    `https://api.unsplash.com/collections/${albumId}/add`,
    {
      photo_id: photoId, 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

