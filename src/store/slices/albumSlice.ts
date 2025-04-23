import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Album {
  id: string;     
  name: string;
  images: string[];
}
interface AlbumState {
  selectedAlbum: Album | null;
  collections: Album[];
  search: string;
  page: number;
}

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
    addAlbum(state, action: PayloadAction<Album>) {
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
