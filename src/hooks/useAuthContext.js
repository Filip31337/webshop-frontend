import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("Hook useAuthContext must be used inside AuthContextProvider!");
    }

    return context;
}