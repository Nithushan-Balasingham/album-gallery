import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumRedux, AlbumState } from '../../utils/types';


const initialState: AlbumState = {
  selectedAlbum: null,
  collections: [],
  search: '',
  page: 1,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    addAlbum(state, action: PayloadAction<AlbumRedux>) {
      state.collections.push(action.payload);
    },
    addImageToAlbum: (state, action: PayloadAction<{ albumId: string; imageId: string }>) => {
      const { albumId, imageId } = action.payload;
      const album = state.collections.find((album) => album.id === albumId);
      if (album) {
        album.images.push(imageId); 
      }
    },  

  },
});

export const { 
  addAlbum,
  addImageToAlbum 
} = albumSlice.actions;

export default albumSlice.reducer;
