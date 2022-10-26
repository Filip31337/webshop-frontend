import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Home() {

    let navigate = useNavigate();

    function redirectToLogin() {
        navigate("/Login");
    }

    return  (
            <div style={{"textAlign": "center"}}>
                <h1 className = "text-center">Welcome to webshop front end!</h1>
                <Button variant="primary" onClick={redirectToLogin}>Log In</Button>{' '}
            </div>
    )

}

export default Home;
