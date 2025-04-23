import { AppDispatch } from '../store'; 
import axios from 'axios';
import { addAlbum } from '../store/slices/albumSlice';

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const createAlbum = (title: string, description = "", isPrivate = false) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.post(
      "https://api.unsplash.com/collections",
      { title, description, private: isPrivate },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const newAlbum = {
      id: res.data.id, 
      name: res.data.title,
      images: [], 
    };

    dispatch(addAlbum(newAlbum));
    return res.data;
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};
