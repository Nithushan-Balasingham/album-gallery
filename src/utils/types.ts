export interface CreateAlbumFormProps {
  onSubmit: (data: {
    title: string;
    private: boolean;
    images: string[];
    description?: string;
  }) => Promise<void>;
}

export interface UserCollection {
  id: string;
  title: string;
  description?: string;
  cover_photo?: {
    id: string;
    urls: {
      thumb: string;
    };
  };
  user?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  total_photos?: number;
  preview_photos?: {
    id: string;
    urls: {
      thumb: string;
      full: string;
    };
    slug: string;
  }[];
}

export interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface Album {
  id: string;
  title: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

export type ImagePreviewModalProps = {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
};

export interface AlbumRedux {
  id: string;
  name: string;
  images: string[];
}
export interface AlbumState {
  selectedAlbum: AlbumRedux | null;
  collections: AlbumRedux[];
  search: string;
  page: number;
}

export interface AuthState {
  accessToken: string | null;
  username: string | null;
  id: string | null;
}

export interface AlbumGrid {
  id: string;
  title: string;
  description?: string;
}

export interface AlbumCardGridProps {
  albums: AlbumGrid[];
  selectedAlbumId?: string;
  onAlbumClick: (album: AlbumGrid) => void;
  onViewClick: (albumId: string) => void;
}

export interface Photo {
  id: string;
  slug: string;
  urls: {
    thumb: string;
    full: string;
  };
}

export interface AlbumPreviewPhotosProps {
  title: string;
  previewPhotos: Photo[];
  onImageClick: (imageUrl: string) => void;
}

export interface AlbumTable {
  id: string;
  title: string;
  description?: string;
}

export interface AlbumTableProps {
  albums: AlbumTable[];
  selectedAlbumId?: string;
  onAlbumClick: (album: AlbumTable) => void;
  onViewClick: (albumId: string) => void;
}


export interface CollectionImage {
  id: string;
  title?: string;
  description?: string;
  cover_photo?: {
    id: string;
    urls: {
      thumb: string;
    };
  };
}

