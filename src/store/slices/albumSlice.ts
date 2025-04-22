import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Album = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};

interface AlbumState {
  list: Album[];
}

const initialState: AlbumState = {
  list: [],
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    addAlbum: (state, action: PayloadAction<Album>) => {
      state.list.push(action.payload);
    },
    deleteAlbum: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(album => album.id !== action.payload);
    },
  },
});

export const { addAlbum, deleteAlbum } = albumSlice.actions;
export default albumSlice.reducer;
