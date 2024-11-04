import { Fragment } from 'react';

import AvailableProducts from './AvailableProducts';
import ProductsSummary from './ProductsSummary';
import classes from './css/Products.module.css';
import closetImage from '../../../assets/closet.jpg';

const Products = () => {
  return (
    <Fragment>
      <div className={classes['main-image']}>
        <img src={closetImage} alt="A table full of delicious food!" />
      </div>
      <ProductsSummary />
      <AvailableProducts />
    </Fragment>
  );
};

export default Products;
