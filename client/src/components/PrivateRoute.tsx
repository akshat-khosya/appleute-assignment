import React from "react";
import Login from "../pages/Login";
import useStore from "../hooks/store";

interface ProtectedRouteProps {
	Component: React.ComponentType<unknown>;
}
const PrivateRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
	const { isAuthenticated } = useStore();

	if (!isAuthenticated) {
		return <Login />;
	}
	return <Component />;
};

export default PrivateRoute;
