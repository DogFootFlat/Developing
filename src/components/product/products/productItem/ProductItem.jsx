import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../../../store/cart-context';
import ProductItemForm from './ProductItemForm';
import classes from './css/ProductItem.module.css';

const ProductItem = (props) => {
  const [selectedSize, setSelectedSize] = useState('');
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    if (props.sizes && props.sizes.length > 0 && !selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.rprice > 0 ? props.rprice : props.oprice,
      size: selectedSize || 'One Size',
    });
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <li className={classes.productCard}>
      <Link to={`/product/${props.num}`} className={classes.productLink}>
        <div className={classes.productContent}>
          <div className={classes.imageContainer}>
            <img src={props.img} alt={props.name} className={classes.productImage} />
          </div>
          <h3 className={classes.productName}>{props.name}</h3>
          {props.productInfo && <div className={classes.description}>{props.productInfo}</div>}
          <div className={classes.priceSection}>
            {props.rprice > 0 ? (
              <>
                <div className={classes.originalPrice}>{props.oprice.toLocaleString()} 원</div>
                <div className={classes.discountWrapper}>
                  <span className={classes.discountPercentage}>
                    {Math.round(((props.oprice - props.rprice) / props.oprice) * 100)}%
                  </span>
                  <span className={classes.salePrice}>{props.rprice.toLocaleString()} 원</span>
                </div>
              </>
            ) : (
              <div className={classes.salePrice}>{props.oprice.toLocaleString()} 원</div>
            )}
          </div>
        </div>
      </Link>
      {props.sizes && props.sizes.length > 0 && (
        <div className={classes.sizeSelection}>
          {props.sizes.map((size) => (
            <button
              key={size}
              className={`${classes.sizeButton} ${selectedSize === size ? classes.selectedSize : ''}`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>
      )}
      <ProductItemForm id={props.id} onAddToCart={addToCartHandler} disabled={props.sizes && props.sizes.length > 0 && !selectedSize} />
    </li>
  );
};

export default ProductItem;