import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';

const ProductFilter = React.memo(({ id, items, queryObj, onChange }) => {
  const [localQuery, setLocalQuery] = useState(queryObj[id] || '');

  useEffect(() => {
    setLocalQuery(queryObj[id] || '');
  }, [queryObj, id]);

  const onChangeHandler = useCallback((event) => {
    const newValue = event.target.value;
    setLocalQuery(newValue);
    onChange(id, newValue);
  }, [id, onChange]);

  return (
    <FormControl variant="outlined" fullWidth style={{ marginBottom: '1em' }}>
      <InputLabel id={`${items[0]?.name}-label`}>{items[0]?.name}</InputLabel>
      <Select
        labelId={`${items[0]?.name}-label`}
        displayEmpty
        id={items[0]?.name}
        value={localQuery}
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
});

export default ProductFilter;