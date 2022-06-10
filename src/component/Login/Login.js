import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {

    let navigate = useNavigate();

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAlreadyLoggedIn = async () =>{
            setLoading(true);
            try {
                const {data: response} = localStorage.getItem("token");
                if (response && response.length > 1) {
                    console.log("Nasao stari token: " + JSON.stringify(response));
                    setToken(response);
                    setAuthToken(token);
                    redirectToUserPage();

                }
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        checkAlreadyLoggedIn();
    })

    function redirectToUserPage() {
        navigate("/User");
    }

    function setAuthToken(token)  {
        if (token.length > 1) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();

        const { username, password } = document.forms[0];


        //reqres registered sample user
        const jwtRequest = {
            username: username.value,
            password: password.value
        }

        console.log("saljem request: " + JSON.stringify(jwtRequest));

        axios.post("http://localhost:8080/webshop/authenticate", jwtRequest)
            .then(response => {
                console.log("dobio response: " + JSON.stringify(response));
                //get token from response
                const token  =  response.data.token;

                //set JWT token to local
                localStorage.setItem("token", token);

                //set JWT token to state
                setToken(token);

                //set token to axios common header
                setAuthToken(token);

                redirectToUserPage();
            })
            .catch(err => console.log(err));
    }


        return (
        <div className="form">
            {loading && <div>Loading</div>}
            {!loading &&
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        Tip: Never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>}

        </div>
    )
}

export default Login;
