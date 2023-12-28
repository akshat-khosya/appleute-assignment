import { Button, CircularProgress, IconButton, Snackbar } from "@mui/material";
import React, { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import http from "../utils/http";

const RegisterForm = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e: SyntheticEvent) => {

        const target = e.target as HTMLInputElement

        setData({ ...data, [target.name]: target.value });
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log(data);
        try {
            await http.post("/auth", data);
            setOpen(true);
            setLoading(false);
            setData({});
            setMessage("Account created successfully");
        } catch (error) {
            console.log(error);
            setOpen(true);
            setMessage("Try Again");
            setLoading(false);
        }

    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div className="login-form  bg-white shadow col-11 col-lg-4 mx-auto my-5 text-black p-3" style={{ minHeight: '500px' }}>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={message}
                action={action}
            />
            <h3 className="fw-bold text-center">Sign In</h3>
            <form action="" onSubmit={handleSubmit}>

                <div className="my-4">
                    <div className="username w-100">
                        <label className="w-100">
                            <span>Email :</span> <input type="email" name="email" className="form-control rounded-0 p-2" onChange={handleChange} />
                        </label>
                    </div>
                    <div className="username my-4">
                        <label className="w-100">
                            <span>Name :</span> <input type="text" name="name" className="form-control rounded-0 p-2" onChange={handleChange} />
                        </label>
                    </div>
                    <div className="user-pass my-4">
                        <label className="w-100">
                            <span>Password :</span> <input type="password" name="password" className="form-control rounded-0 p-2" onChange={handleChange} />
                        </label>
                    </div>
                    <div className="submit text-center my-4">
                        <button type="submit" className="w-100 border-0 fd-btn">{loading ? <CircularProgress /> : "Sign Up"}</button>
                    </div>
                    <div className="bt text-center">
                        <div className="signup mt-2"><span>{`Already have account ?`}</span><Link to="/login" className="fd-color-primary">Login</Link></div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export { RegisterForm }