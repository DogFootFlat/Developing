import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../../../store/cart-context';
import ProductItemForm from './ProductItemForm';
import classes from './css/ProductItem.module.css';

const ProductItem = (props) => {
	const cartCtx = useContext(CartContext);
	const price = `${props.oprice} 원`;
	let discountDisplay = <div className={classes.salePrice}>{price}</div>;

	if (props.rprice > 0) {
		const discountPercentage = Math.round(((props.oprice - props.rprice) / props.oprice) * 100);
		discountDisplay = (
			<div className={classes.discount}>
				<span className={classes.originalPrice}>{props.oprice} 원</span>
				<span className={classes.discountPercentage}>{discountPercentage}% OFF</span>
				<span className={classes.salePrice}>{props.rprice} 원</span>
			</div>
		);
	}

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.oprice,
		});
	};

	return (
		<li className={classes.product}>
			<div>
				<h3>{props.name}</h3>
				{props.productInfo && <div className={classes.description}>{props.productInfo}</div>}
				<div>
					<Link>
						<img src={props.img} alt={props.name} />
					</Link>
				</div>
				{discountDisplay}
			</div>
			<div>
				<ProductItemForm id={props.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default ProductItem;
