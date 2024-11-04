import { Fragment } from 'react';
import AvailableProducts from './AvailableProducts';
import ProductsSummary from './ProductsSummary';
import classes from './css/Products.module.css';
import closetImage from '../../../assets/closet.jpg';

const Products = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes['main-image']}>
          <img src={closetImage} alt="A closet full of stylish clothes" />
        </div>
        <div className={classes['summary-container']}>
          <ProductsSummary />
        </div>
      </div>
      <div className={classes['products-container']}>
        <AvailableProducts />
      </div>
    </Fragment>
  );
};

export default Products;
