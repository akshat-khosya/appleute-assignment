import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GlobalContext from "../context/GlobalContext";

interface GuestRouteProps {
    Component: React.ComponentType<unknown>;
}
const GuestRoute: React.FC<GuestRouteProps> = ({ Component }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(GlobalContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

    }, [isAuthenticated, navigate]);
    if (!isAuthenticated) {
        return <Component />;
    }
    return null;
};

export default GuestRoute;