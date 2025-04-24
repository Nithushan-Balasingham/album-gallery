import { AppDispatch, RootState } from '../store'; 
import axios from 'axios';
import { addAlbum } from '../store/slices/albumSlice';

export const createAlbum = (title: string, description = "", isPrivate = false) => 
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.accessToken;

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
      };

      dispatch(addAlbum(newAlbum));
      return res.data;
    } catch (error) {
      console.error("Error creating album:", error);
      throw error;
    }
};
