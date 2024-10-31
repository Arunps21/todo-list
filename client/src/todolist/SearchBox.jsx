import React, { useContext, useState } from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import context from './ComponentProvider';


const SearchBox = () => {
  const [search, setSearch] = useState('');

  const {setComponent} = useContext(context)

  const handleSearch = () => {
    setComponent(search)
    console.log('Searching for:', search);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="20vh">
      <Box display="flex" alignItems="center" width="100%" maxWidth="500px" px={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBox;
