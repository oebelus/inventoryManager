// PublicRoute.tsx
import { useEffect, useReducer } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { initialState, reducer } from "./utils/store";

export default function PublicRoute() {
    const [state,] = useReducer(reducer, initialState);
    const user = state.user;

    useEffect(() => {
        console.log("user" + user);
        console.log(user === "null");
    }, []);

    if (user != "null") {
        return <Navigate to="/dashboard" />;
    } else {
        return <Outlet />;
    }
}
