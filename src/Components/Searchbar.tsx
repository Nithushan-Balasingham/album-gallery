import { TextField } from '@mui/material';
import React from 'react';

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

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
