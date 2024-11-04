import { Fragment } from 'react';

import AvailableProducts from './AvailableProducts';
import ProductsSummary from './ProductsSummary';

const Products = () => {
	return (
		<Fragment>
			<ProductsSummary />
			<AvailableProducts />
		</Fragment>
	);
};

export default Products;
