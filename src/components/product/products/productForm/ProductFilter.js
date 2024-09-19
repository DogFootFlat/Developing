import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';

const ProductFilter = ({ props: { filter_name, filter, setFilter, onChange, filter_list } }) => {
	const onChangeHandler = (event) => {
		setFilter(event.target.value);
		onChange();
	};

	return (
		<FormControl variant="filled" fullWidth>
			<InputLabel htmlFor="uncontrolled-native">{filter_name}</InputLabel>
			<Select displayEmpty id={filter_name} value={filter} onChange={onChangeHandler} sx={{ textAlign: 'right' }}>
				<MenuItem value="">전체</MenuItem>
				{filter_list?.map((menu_item) => (
					<MenuItem value={menu_item.value}>{menu_item.label}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ProductFilter;
