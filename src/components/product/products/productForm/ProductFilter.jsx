import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const ProductFilter = ({ id, items, queryObj, onChange }) => {
  const [query] = useState(queryObj);

  const onChangeHandler = (event) => {
    onChange(id, event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth style={{ marginBottom: '1em' }}>
      <InputLabel id={`${items[0]?.name}-label`}>{items[0]?.name}</InputLabel>
      <Select
        labelId={`${items[0]?.name}-label`}
        displayEmpty
        id={items[0]?.name}
        value={query[id]}
        onChange={onChangeHandler}
        sx={{ textAlign: 'right' }}
      >
        <MenuItem value="">전체</MenuItem>
        {items[0]?.list.map((menu_item) => (
          <MenuItem key={menu_item.value} value={menu_item.value}>
            {menu_item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductFilter;
