import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../../../store/cart-context';
import ProductItemForm from './ProductItemForm';
import classes from './css/ProductItem.module.css';

const ProductItem = (props) => {
	const cartCtx = useContext(CartContext);
	const price = `${props.price} 원`;

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};

	return (
		<li className={classes.product}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.genre}</div>
				<div>
					<Link>
						<img src={props.img}></img>
					</Link>
				</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<ProductItemForm id={props.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default ProductItem;
