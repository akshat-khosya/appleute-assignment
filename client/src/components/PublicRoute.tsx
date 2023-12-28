import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useStore from "../hooks/store";

interface GuestRouteProps {
    Component: React.ComponentType<unknown>;
}
const GuestRoute: React.FC<GuestRouteProps> = ({ Component }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useStore();

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