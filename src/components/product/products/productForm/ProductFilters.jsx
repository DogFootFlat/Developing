import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import classes from './css/ProductFilters.module.css';

const ProductFilters = React.memo(({ id, items, queryObj, onChange }) => {
  const majorKey = items?.find((x) => x.id?.includes('major'))?.id;
  const minorKey = items?.find((x) => x.id?.includes('minor'))?.id;
  const minorObj = items?.find((x) => x.id === minorKey)?.list_obj;

  const [localQuery, setLocalQuery] = useState(queryObj);
  const [minorFilter, setMinorFilter] = useState([]);

  useEffect(() => {
    setLocalQuery(queryObj);
  }, [queryObj]);

  useEffect(() => {
    if (localQuery[majorKey] || localQuery[majorKey] === '') {
      setMinorFilter(minorObj[localQuery[majorKey]] || []);
    }
  }, [localQuery, majorKey, minorObj]);

  const onChangeHandler = useCallback(
    (filter_id, event) => {
      const value = event.target.value;
      setLocalQuery((prevQuery) => {
        const updatedQuery = { ...prevQuery, [filter_id]: value };
        if (filter_id === majorKey) {
          updatedQuery[minorKey] = '';
        }
        return updatedQuery;
      });
      onChange(filter_id, value);
      if (localQuery[majorKey] && filter_id === minorKey) {
        onChange(id, value === '' ? '' : `${localQuery[majorKey]}0${value}`);
      }
      if (filter_id === majorKey && value === '') {
        onChange(id, '');
      }
    },
    [localQuery, majorKey, minorKey, id, onChange]
  );

  return (
    <div className={classes['form-div']} style={{ marginBottom: '1em' }}>
      {items.map((filter) => (
        <FormControl key={filter.id} variant="outlined" className={classes['form-control']}>
          <InputLabel id={`${filter.id}-label`}>{filter.name}</InputLabel>
          <Select
            labelId={`${filter.id}-label`}
            displayEmpty
            id={filter.id}
            value={localQuery[filter.id] || ''}
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
});

export default ProductFilters;
