import { Fragment } from 'react';

import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';
import { Select } from '@mui/material';

const Meals = () => {
	return (
		<Fragment>
			<MealsSummary />
			{/* <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={searchMethod}
        label="searchMethod"
        onChange={onSelectChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
			<AvailableMeals />
		</Fragment>
	);
};

export default Meals;
