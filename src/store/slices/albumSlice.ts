import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Album {
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
  addAlbum,
  setSelectedAlbum, 
  setCollections, 
  setSearch, 
  setPage, 
  clearSelectedAlbum ,
  addImageToAlbum 
} = albumSlice.actions;

export default albumSlice.reducer;
