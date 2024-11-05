import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import classes from './css/ProductSearch.module.css';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Box className={classes['form-div']} component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <TextField
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
        fullWidth
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained" startIcon={<Search />}>
        검색
      </Button>
    </Box>
  );
};

export default ProductSearch;
