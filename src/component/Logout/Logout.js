import React from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { isUserLoggedIn, resetLocalStorageToken } from "../utility/utils.js";

function Logout() {

    let navigate = useNavigate();

    const [token, setToken] = useState("");

    function resetAuthTokenHeader()  {
        delete axios.defaults.headers.common["Authorization"];
    }

    function redirectToLogin() {
        navigate("/Login");
    }

    function resetStoreToken() {
        setToken("");
    }

    function resetToken() {
        resetLocalStorageToken().then(() => {
            resetStoreToken();
            resetAuthTokenHeader();
        });
    }

    function onLogoutClick() {
        resetToken();
        redirectToLogin();
    }

    return  (
        <div style={{"textAlign": "center"}}>
            <h1 className = "text-center">Click here to logout!</h1>
            <Button variant="primary" onClick={onLogoutClick}>Logout</Button>{' '}
        </div>
    )

}

export default Logout;