import React, { useContext } from "react";
import Login from "../pages/Login";
import GlobalContext from "../context/GlobalContext";

interface ProtectedRouteProps {
    Component: React.ComponentType<unknown>;
}
const PrivateRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
    const { isAuthenticated } = useContext(GlobalContext);

    if (!isAuthenticated) {
        return <Login />;
    }
    return (
        <Component />
    );
};

export default PrivateRoute;