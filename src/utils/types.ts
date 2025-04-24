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
  