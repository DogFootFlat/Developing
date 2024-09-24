import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import classes from './css/ProductFilters.module.css';

const ProductFilters = ({ id, items, queryObj, onChange }) => {
  const majorKey = items?.find((x) => x.id?.includes('major'))?.id;
  const minorKey = items?.find((x) => x.id?.includes('minor'))?.id;
  const minorObj = items?.find((x) => x.id === minorKey)?.list_obj;

  const [query, setQuery] = useState(queryObj);
  const [minorFilter, setMinorFilter] = useState([]);

  const onChangeHandler = (filter_id, event) => {
    const tempQuery = query;
    tempQuery[filter_id] = event.target.value;
    setQuery(tempQuery);
    setMinorFilter(minorObj[event.target.value]);

    onChange(filter_id, event.target.value);
    query[majorKey] && filter_id === minorKey && onChange(id, `${tempQuery[majorKey]}0${tempQuery[minorKey]}`);
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
            value={query[filter.id]}
            onChange={(event) => onChangeHandler(filter.id, event)}
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
