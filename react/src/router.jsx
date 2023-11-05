import { createBrowserRouter, Navigate } from "react-router-dom";
import Signup from './views/Signup';
import Login from './views/Login';
import Users from './views/Users';
import Home from './views/Home';
import NotFound from './views/NotFound';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from "./layouts/GuestLayout";
import Landing from './views/Landing';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/Home'/>,
            },
            {
                path: '/Home',
                element: <Home />
            },
            {
                path: '/Home',
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
            {
                path: '/landing',
                element: <Landing />
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />
    }

]);


export default router;