import React from "react";
import { IProductCard } from "../pages/Dashboard";
import Icons from "../assets/icons";
import { Button } from "@mui/material";
import http from "../utils/http";
import useStore from "../hooks/store";

interface IProductCardProps extends IProductCard {
	onIncrement: () => void;
	onDecrement: () => void;
	showCartControls: boolean;
	showAddToCart?: boolean;
}

const ProductCard: React.FC<IProductCardProps> = ({
	_id,
	title,
	price,
	quantity,
	thumbnail,
	description,
	onIncrement,
	onDecrement,
	showAddToCart = false,
	showCartControls = false,
	rating,
	brand,
	category,
	createdAt,
}) => {
	const { cart, setCart } = useStore();
	const addItemToCart = async () => {
		try {
			await http.post(`/cart`, { product: _id });
			setCart([
				...cart,
				{
					_id,
					title,
					price,
					thumbnail,
					description,
					rating,
					brand,
					category,
					createdAt,
					quantity: 1,
				},
			]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="card">
			<img src={thumbnail} alt={title} />
			<div className="card-content">
				<h3>{title}</h3>
				<p>{description}</p>
				<span>${price}</span>
				{showAddToCart ? (
					<Button
						variant="contained"
						onClick={() => {
							addItemToCart();
						}}
					>
						Add to cart
					</Button>
				) : null}
				{showCartControls ? (
					<div className="card-buttons">
						<button
							className="card-btn"
							onClick={() => {
								onDecrement();
							}}
						>
							<Icons.Minus />
						</button>
						<span>{quantity}</span>
						<button
							className="card-btn"
							onClick={() => {
								onIncrement();
							}}
						>
							<Icons.Add />
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ProductCard;
