import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { getTokenFromLocalStorage, isUserLoggedIn } from "../utility/utils.js";

function Login() {

    let navigate = useNavigate();

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError]=useState("");
    // Testing warning handle
    const handleSetToken = (newToken: string) => setToken({
      ...token,
      token: newToken,
    });

    useEffect(() => {

        const checkAlreadyLoggedIn = async () =>{
            setLoading(true);
            try {
                isUserLoggedIn()
                  .then((result) => {
                  if (result === true) {
                    const localToken = getTokenFromLocalStorage();
                    handleSetToken(localToken);
                    setAuthTokenHeader(localToken);
                    redirectToUserPage();
                  }
                });
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        checkAlreadyLoggedIn();
    })

    function redirectToUserPage() {
        navigate("/users");
    }

    function setAuthTokenHeader(token)  {
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
                setAuthTokenHeader(token);

                setLoginError("");

                redirectToUserPage();
            })
            .catch((err) => {
                console.log(err);
                setLoginError("Wrong username or password.");
                }
             );
    }


        return (
        <div className="form">
            {loading && <div>Loading</div>}
            {!loading &&
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username" />
                    {loginError &&
                    <Form.Text className="text-muted">
                                            {loginError}
                                        </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                    {loginError &&
                    <Form.Text className="text-muted">
                                            {loginError}
                    </Form.Text>}
                    {!loginError &&
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
