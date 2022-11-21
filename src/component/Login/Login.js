import React, {useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import axios from 'axios';
import {useAuthContext} from "../../hooks/useAuthContext";

function Login() {

    let navigate = useNavigate();

    const {login, error, isLoading } = useLogin();
    const { user } = useAuthContext();

    function redirectToHomePage() {
        navigate("/");
    }

    function setAuthTokenHeader(token)  {
        if (token.length > 1) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    async function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();

        const { username, password } = document.forms[0];

        await login(username, password);
    }

    useEffect(() =>{
       if (user){
           if (!error) {
               redirectToHomePage();
           };
       }
    });

        return (
        <div className="form">
            {isLoading && <div>isLoading</div>}
            {!isLoading &&
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username" />
                    {error &&
                    <Form.Text className="text-muted">
                                            {error}
                                        </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                    {error &&
                    <Form.Text className="text-muted">
                                            {error}
                    </Form.Text>}
                    {!error &&
                    <Form.Text className="text-muted">
                        Tip: Never share your password with anyone else.
                    </Form.Text>}
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
