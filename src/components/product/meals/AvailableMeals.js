import React, { useState, useEffect, useContext, useCallback } from "react";
import MealItem from "./mealItem/MealItem";
import Card from "../UI/Card";
import classes from "./css/AvailableMeals.module.css";
import AuthContext from "../../../store/auth-context";
import ApiService from "../../../ApiService";

const AvailableMeals = () => {
  const ctx = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchProducts();
      if (response.status < 200 || response.status > 299) {
        throw new Error("Something went wrong!");
      }
			const data = await response.data?.content;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProductsHandler();
    ctx.setCurrentPage("prod-list");
  }, [fetchProductsHandler]);

  if (products.length <= 0) {
		return (
			<Card className={classes.meals}>
				<h2>현재 상품 목록이 비어있습니다.</h2>
			</Card>
		);
	}

  if (error) {
		return (
			<Card className={classes.meals}>
				<div>
					<p>{error}</p>
				</div>
			</Card>
		);
  }
  if (isLoading) {
		return (
			<Card className={classes.meals}>
				<Loading />;
			</Card>
		);
  }

	const productsList = products.map((product) => (
		<MealItem
			id={product.productcode}
			key={product.productcode}
			name={product.productname}
			genre={product.genrecode}
			img={product.productimg0}
			price={product.oprice}
		/>
	));

  return (
    <Card className={classes.meals}>
      <ul>{productsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
