import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import classes from './css/ProductFilter.module.css';

const ProductFilter = ({ props: { filter_name, filter, setFilter, onChange, filter_list } }) => {
  const onChangeHandler = (event) => {
    setFilter(event.target.value);
    onChange();
  };

  return (
    <span className={classes['form-div']}>
      <FormControl variant="outlined" className={classes['form-control']}>
        <InputLabel htmlFor="uncontrolled-native">{filter_name}</InputLabel>
        <Select displayEmpty id={filter_name} value={filter} onChange={onChangeHandler} sx={{ textAlign: 'right' }}>
          <MenuItem value="">전체</MenuItem>
          {filter_list?.map((menu_item) => (
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
