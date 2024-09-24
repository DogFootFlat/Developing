import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import classes from './css/ProductFilters.module.css';

const ProductFilters = ({ id, items, onChange }) => {
  const majorKey = items?.find((x) => x.id?.includes('major'))?.id;
  const minorKey = items?.find((x) => x.id?.includes('minor'))?.id;
  const minorObj = items?.find((x) => x.id === minorKey)?.list_obj;

  const [valueObj, setValueObj] = useState(items.reduce((acc, filter) => ({ ...acc, [filter.id]: '' }), {}));
  const [minorFilter, setMinorFilter] = useState([]);

  const onChangeHandler = (event, filter_id) => {
    const param = { ...valueObj, [filter_id]: event.target.value };
    setValueObj(param);
    setMinorFilter(minorObj[event.target.value]);

    valueObj[majorKey] && filter_id.includes('minor') && onChange(id, Object.values(param)?.join('0'));
  };

  return (
    <div className={classes['form-div']} style={{ marginBottom: '1em' }}>
      {items.map((filter) => (
        <FormControl key={filter.id} variant="outlined" className={classes['form-control']}>
          <InputLabel id={`${filter.id}-label`}>{filter.name}</InputLabel>
          <Select
            labelId={`${filter.id}-label`}
            displayEmpty
            id={filter.id}
            value={valueObj[filter.id]}
            onChange={(event) => onChangeHandler(event, filter.id)}
            sx={{ textAlign: 'right' }}
          >
            <MenuItem value="">전체</MenuItem>
            {(!filter.list ? minorFilter : filter.list)?.map((menu_item) => (
              <MenuItem key={menu_item.value} value={menu_item.value}>
                {menu_item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default ProductFilters;
