import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import GuestRoute from '../components/PublicRoute';
import GlobalContext from '../context/GlobalContext';


function RoutesWrapper() {
    const { setAuthenticates, axiosInstance } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const autoLogin = async (token: string) => {
        try {
            await axiosInstance.get('/auth/auto-login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAuthenticates(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setAuthenticates(false);
            setLoading(false);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            autoLogin(token);
        } else {
            setLoading(false);
        }
    }, [setAuthenticates]);
    return (
        <>
            {loading ? (

                <div>Loading...</div>
            ) : (
                <Routes>
                    <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
                    <Route path="/login" element={<GuestRoute Component={Login} />} />
                    <Route path="/signup" element={<GuestRoute Component={Register} />} />
                </Routes>
            )}
        </>
    );
}

export default RoutesWrapper;

