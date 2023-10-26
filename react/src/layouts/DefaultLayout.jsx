import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (!token) {
        return <Navigate to='./login' />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;