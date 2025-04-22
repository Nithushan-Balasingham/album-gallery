import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbum } from '../store/slices/albumSlice';
import { useCreateCollection } from '../hooks/useCreateCollection';

const AddAlbum = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const accessToken = useSelector((state: any) => state.auth.accessToken); // Assuming accessToken is stored in Redux
  const dispatch = useDispatch();
  
  const { mutate, isLoading, error } = useCreateCollection();

  const handleCreateCollection = async () => {
    if (title.trim()) {
      try {
        const newCollection = await mutate(accessToken, title, description);
        
        // Dispatch action to add the collection to Redux state
        dispatch(addAlbum({
          id: newCollection.id,
          name: newCollection.title,
          description: newCollection.description,
          createdAt: newCollection.created_at,
        }));
      } catch (err) {
        console.error('Failed to create collection:', err);
      }
    }
  };

  return (
    <div>
      <h2>Create New Collection</h2>
      <input
        type="text"
        placeholder="Collection Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Collection Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateCollection} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Collection'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default AddAlbum;
