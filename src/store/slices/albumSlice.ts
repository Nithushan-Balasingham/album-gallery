import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define initial state for the album slice
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

// Create album slice
const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    // Action to set the selected album
    setSelectedAlbum(state, action: PayloadAction<any>) {
      state.selectedAlbum = action.payload;
    },
    // Action to set the list of collections
    setCollections(state, action: PayloadAction<any[]>) {
      state.collections = action.payload;
    },
    // Action to set the search term
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    // Action to set the page number
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    // Clear the selected album
    clearSelectedAlbum(state) {
      state.selectedAlbum = null;
    },
  },
});

// Export the actions for use in components
export const { 
  setSelectedAlbum, 
  setCollections, 
  setSearch, 
  setPage, 
  clearSelectedAlbum 
} = albumSlice.actions;

// Export the reducer to be used in the store
export default albumSlice.reducer;
