import React, { useEffect, useState } from "react";
import http from "../utils/http";
import { Button } from "@mui/material";
import "../styles/Dashboard.scss";
import { IProduct } from "../types/product";
import Card from "../components/ProductCard";
import Icons from "../assets/icons";
import useStore from "../hooks/store";

export interface IProductCard extends IProduct {
	quantity: number;
}

const Dashboard = () => {
	const [openCartPane, setOpenCartPane] = useState(false);
	const [products, setProducts] = useState<IProductCard[]>([]);
	const [page, setPage] = useState(1);
	const { cart, setCart } = useStore();

	console.log(products, cart);

	const getAllProducts = async () => {
		try {
			const res = await http.get(`/product?page=${page}`);
			setProducts([
				...products,
				...res.data.products.map((p: IProduct) => ({
					...p,
					quantity: 0,
				})),
			]);
		} catch (error) {
			console.error(error);
		}
	};
	const updateItemToCart = async (id: string, quantity: number) => {
		try {
			await http.put(`/cart/${id}`, { quantity: quantity });
			setCart(
				cart.map((p) => {
					if (p._id === id) {
						return {
							...p,
							quantity: quantity,
						};
					}
					return p;
				})
			);
		} catch (error) {
			console.error(error);
		}
	};
	const removeItemFromCart = async (id: string) => {
		try {
			const res = await http.delete(`/cart/${id}`);
			console.log(res);
			setCart(cart.filter((p) => p._id !== id));
		} catch (error) {
			console.error(error);
		}
	};
	const getALLCarts = async () => {
		try {
			const res = await http.get(`/cart`);
			const resCartItems = res.data.cartItems.map((p: any) => ({
				...p,
				...p.productDetails,
				quantity: p.totalItems,
				_id: p.product,
			}));
			setCart(resCartItems);
		} catch (error) {
			console.error(error);
		}
	};
	const clearCart = async () => {
		try {
			const res = await http.delete(`/cart`);
			setProducts(
				products.map((p) => {
					return {
						...p,
						quantity: 0,
					};
				})
			);
			setCart([]);
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};
	const checkout = async () => {
		try {
			const res = await http.post(`/order`);
			console.log(res);
			setCart([]);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getAllProducts();
	}, [page]);
	useEffect(() => {
		getALLCarts();
	}, []);

	return (
		<>
			<main className="dashboard">
				<header className="dashboard-header">
					<h1>Dashboard</h1>
					<button className="icon-btn" onClick={() => setOpenCartPane(true)}>
						<Icons.Bag />
					</button>
				</header>
				<div className="dashboard-container">
					{products.map((product) => (
						<Card
							{...product}
							key={`product-${product._id}`}
							onDecrement={() => {
								if (product.quantity - 1 === 0) {
									removeItemFromCart(product._id);
								} else {
									updateItemToCart(product._id, product.quantity - 1);
								}
							}}
							onIncrement={() => {
								updateItemToCart(product._id, product.quantity + 1);
							}}
							showCartControls={false}
							showAddToCart={
								cart.findIndex((p) => p._id === product._id) === -1
							}
						/>
					))}
				</div>
				<Button variant="contained" onClick={() => setPage(page + 1)}>
					Load More
				</Button>
			</main>
			{openCartPane ? (
				<>
					<div
						className="cart-cover"
						onClick={() => setOpenCartPane(false)}
					></div>
					<div className="cart-pane">
						<div className="cart-header">
							<h1>Cart</h1>
							<button
								onClick={() => setOpenCartPane(false)}
								className="icon-btn"
							>
								<Icons.X />
							</button>
						</div>
						<div className="cart-body">
							{cart.map((product) => (
								<Card
									{...product}
									key={`product-${product._id}`}
									showCartControls={true}
									onDecrement={() => {
										if (product.quantity - 1 === 0) {
											removeItemFromCart(product._id);
										} else {
											updateItemToCart(product._id, product.quantity - 1);
										}
									}}
									onIncrement={() => {
										updateItemToCart(product._id, product.quantity + 1);
									}}
								/>
							))}
							{cart.length > 0 ? (
								<div className="cart-total">
									<h1>Total</h1>
									<h1>
										{cart.reduce((acc, curr) => {
											return acc + curr.price * curr.quantity;
										}, 0)}
									</h1>
								</div>
							) : (
								<h1>Cart is empty</h1>
							)}
						</div>
						<div className="cart-footer">
							<Button
								variant="outlined"
								onClick={() => {
									clearCart();
								}}
							>
								Empty Cart
							</Button>
							<Button
								variant="contained"
								onClick={() => {
									checkout();
									// clear from frontend also
								}}
							>
								Checkout
							</Button>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default Dashboard;
