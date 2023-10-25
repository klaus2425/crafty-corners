import { createBrowserRouter, Navigate } from "react-router-dom";
import Signup from './views/Signup.jsx';
import Login from './views/Login.jsx';
import Users from './views/Users.jsx';
import UserFeed from './views/UserFeed.jsx';
import NotFound from './views/NotFound.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import GuestLayout from "./layouts/GuestLayout.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '',
                element: <Navigate to='/users'/>,
            },
            {
                path: '/userfeed',
                element: <UserFeed />
            },
            {
                path: '/users',
                element: <Users />
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />
    }

]);


export default router;