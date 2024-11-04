import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import classes from './css/ProductFilters.module.css';

const ProductFilters = ({ id, items, queryObj, onChange }) => {
  const majorKey = items?.find((x) => x.id?.includes('major'))?.id;
  const minorKey = items?.find((x) => x.id?.includes('minor'))?.id;
  const selfKey = majorKey.split('_')?.[0];
  const minorObj = items?.find((x) => x.id === minorKey)?.list_obj;

  const [query, setQuery] = useState(queryObj);
  const [minorFilter, setMinorFilter] = useState([]);

  useEffect(() => {
    if (query[majorKey]) {
      setMinorFilter(minorObj[query[majorKey]] || []);
    }
  }, [query, majorKey, minorObj]);

  const onChangeHandler = (filter_id, event) => {
    const newValue = event.target.value;
    setQuery((prevQuery) => {
      const updatedQuery = { ...prevQuery, [filter_id]: newValue };

      if (filter_id === majorKey) {
        updatedQuery[minorKey] = ''; // Reset minor category when major changes
      }

      onChange(filter_id, newValue);

      if (updatedQuery[majorKey] && filter_id === minorKey) {
        onChange(id, `${updatedQuery[majorKey]}0${newValue}`);
      }

      updateQuery[selfKey] = `${updatedQuery[majorKey]}0${updatedQuery[minorKey]}`;
      return updatedQuery;
    });
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
            value={query[filter.id] || ''}
            onChange={(event) => onChangeHandler(filter.id, event)}
            sx={{ textAlign: 'right' }}
          >
            <MenuItem value="">전체</MenuItem>
            {(filter.id === minorKey ? minorFilter : filter.list)?.map((menu_item) => (
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
