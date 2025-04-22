import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumState {
  selectedAlbum: any | null;
  collections: any[];
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
    setSelectedAlbum(state, action: PayloadAction<any>) {
      state.selectedAlbum = action.payload;
    },
    setCollections(state, action: PayloadAction<any[]>) {
      state.collections = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearSelectedAlbum(state) {
      state.selectedAlbum = null;
    },
  },
});

export const { 
  setSelectedAlbum, 
  setCollections, 
  setSearch, 
  setPage, 
  clearSelectedAlbum 
} = albumSlice.actions;

export default albumSlice.reducer;
