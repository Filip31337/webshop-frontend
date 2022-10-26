import React, {useEffect, useState} from 'react';
import UserService from '../../service/UserService';
import axios from 'axios';
import { getTokenFromLocalStorage, isUserLoggedIn } from "../utility/utils.js";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        const setAuthTokenHeader = async(token) =>{
            if (token.length > 1) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
            else
                delete axios.defaults.headers.common["Authorization"];
        }

        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await UserService.getUsers();
                setUsers(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        getTokenFromLocalStorage().then((token) => {
            if (token && token.length > 1) {
                setLoggedIn(true);
                setAuthTokenHeader(token);
                fetchData();
                setLoading(false);
            } else {
                setLoggedIn(false);
                setLoading(false);
            }
        });
    }, []);
        return (
            <div>
                <h1 className = "text-center"> Users List</h1>
                {loading && <div>Loading</div>}
                {!loading && (
                    <table className = "table table-striped">
                        <thead>
                        <tr>

                            <td> User Id</td>
                            <td> User First Name</td>
                            <td> User Last Name</td>
                            <td> User Email Id</td>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            users.map(
                                user =>
                                    <tr key = {user.id}>
                                        <td> {user.id}</td>
                                        <td> {user.firstName}</td>
                                        <td> {user.lastName}</td>
                                        <td> {user.emailAddress}</td>
                                    </tr>
                            )
                        }

                        </tbody>
                    </table>
                    )}
                {!loggedIn && <div>Please log in to see content!</div>}

            </div>

        )
}

export default Users;

