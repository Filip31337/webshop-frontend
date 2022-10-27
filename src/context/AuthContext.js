import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});

    //check if localstorage has user in case page if refreshed
    useEffect(() =>{
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));

        if (userDetails) {
            dispatch({type: "LOGIN", payload: userDetails});
        }

    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}