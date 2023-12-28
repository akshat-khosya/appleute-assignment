import { useState } from "react";
import { IProductCard } from "../pages/Dashboard";

export const useContextData = () => {
	const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

	const [cart, setCart] = useState<IProductCard[]>([]);

	const handleCart = (products: IProductCard[]) => {
		setCart(products);
	};

	return {
		isAuthenticated,
		setAuthenticated,
		cart,
		setCart: handleCart,
	};
};
