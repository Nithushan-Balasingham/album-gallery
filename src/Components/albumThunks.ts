import { AppDispatch, RootState } from '../store'; 
import axios from 'axios';
import { addAlbum } from '../store/slices/albumSlice';
import { useSelector } from 'react-redux';

// const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const createAlbum = (title: string, description = "", isPrivate = false) => async (dispatch: AppDispatch) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  try {
    const res = await axios.post(
      "https://api.unsplash.com/collections",
      { title, description, private: isPrivate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
