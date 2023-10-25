import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    }
    {
        path: '/signup',
        element: <Signup />
    }
    {
        path: '/users',
        element: <Users />
    }

]);


export default router;