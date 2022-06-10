import React, {useEffect, useState} from 'react';
import UserService from '../../service/UserService';

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchData();
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

            </div>

        )
}

export default User;

