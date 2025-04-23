import React from 'react';

interface PhotoProps {
  id: string | null;
  urls: { small: string | undefined };
  alt_description: string | undefined;
  created_at: string | undefined;
}

interface PhotoGalleryProps {
  data: PhotoProps[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading photos</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {data?.map((photo) => (
        <div key={photo.id} style={{ marginBottom: 16 }}>
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            width={150}
            style={{ borderRadius: 8 }}
          />
          <div>
            <h4>{photo.alt_description || 'No title available'}</h4>
            <p>{new Date(photo.created_at || '').toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
