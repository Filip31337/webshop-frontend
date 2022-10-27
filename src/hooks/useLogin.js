import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        const jwtRequest = {
            username: username.value,
            password: password.value
        }

        console.log("saljem login request: " + JSON.stringify(jwtRequest));

        axios.post("http://localhost:8080/webshop/authenticate", jwtRequest)
            .then(response => {
                console.log("dobio login response: " + JSON.stringify(response));
                //get data from response
                const token = response.data.jwtResponse.token;
                const userDetails = response.data.userDetails;

                //save data to local storage
                localStorage.setItem("token", token);
                console.log("pospremam token u localstorage: " + token);
                localStorage.setItem("userDetails", JSON.stringify(userDetails));

                //update authContext
                dispatch({type: 'LOGIN', payload: userDetails})

                setError(null);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setError("Wrong username or password!");
                }
             );
    }

    return { login, isLoading, error };
}