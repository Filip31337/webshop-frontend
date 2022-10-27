import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext"

function Home() {
    const { user } = useAuthContext();

    return  (
            <div style={{"textAlign": "center"}}>
                <h1 className = "text-center">Welcome to home page!</h1>
                          {user && (
                              <span>You are logged in as {user.username}.</span>
                          )}
            </div>
    )

}

export default Home;
