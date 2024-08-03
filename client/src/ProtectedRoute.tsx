import { useEffect, useReducer } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { initialState, reducer } from "./utils/store";
import DefaultLayout from "./layout/DefaultLayout";

export default function ProtectedRoute() {
    const [state,] = useReducer(reducer, initialState);
    const user = state.user;

    useEffect(() => {
        console.log("user" + user)
        console.log(user === "null")
    }, [])

    if (user != "null") {
        return (
            <DefaultLayout>
                <Outlet />
            </DefaultLayout>
        );
    } else {
        return <Navigate to="/signup" />;
    }
}
