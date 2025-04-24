import { TextField } from '@mui/material';
import React from 'react';
import { SearchBarProps } from '../utils/types';


const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div className=''>
      <TextField
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Unsplash..."
      />
      
    </div>
  );
};

export default SearchBar;
