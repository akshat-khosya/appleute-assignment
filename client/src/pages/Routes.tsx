import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import GuestRoute from "../components/PublicRoute";
import http from "../utils/http";
import useStore from "../hooks/store";

function RoutesWrapper() {
	const { setAuthenticated } = useStore();
	const [loading, setLoading] = useState(true);
	const autoLogin = async (token: string) => {
		try {
			await http.get("/auth/auto-login", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setAuthenticated(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setAuthenticated(false);
			setLoading(false);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			autoLogin(token);
		} else {
			setLoading(false);
		}
	}, [setAuthenticated]);

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : (
				<Routes>
					<Route
						path="/"
						element={<PrivateRoute Component={Dashboard} />}
					/>
					<Route
						path="/login"
						element={<GuestRoute Component={Login} />}
					/>
					<Route
						path="/signup"
						element={<GuestRoute Component={Register} />}
					/>
				</Routes>
			)}
		</>
	);
}

export default RoutesWrapper;
