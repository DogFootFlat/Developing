import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import classes from './css/ProductFilter.module.css';

const ProductFilter = ({ id, name, onChange, list }) => {
  const [value, setValue] = useState('');

  const onChangeHandler = (event) => {
    onChange(id, event.target.value);
  };

  return (
    <span className={classes['form-div']}>
      <FormControl variant="outlined" className={classes['form-control']}>
        <InputLabel id={`${name}-label`}>{name}</InputLabel>
        <Select labelId={`${name}-label`} displayEmpty id={name} value={value} onChange={onChangeHandler} sx={{ textAlign: 'right' }}>
          <MenuItem value="">전체</MenuItem>
          {list.map((menu_item) => (
            <MenuItem key={menu_item.value} value={menu_item.value}>
              {menu_item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </span>
  );
};

export default ProductFilter;
