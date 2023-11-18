import { createBrowserRouter, Navigate } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Landing from './Pages/Landing';
import Notifications from './Pages/Notifications';
import Profile from './Pages/Profile';
import Communities from './Pages/Communities';
import Articles from './Pages/Articles';
import Videos from './Pages/Videos';
import Mentors from './Pages/Mentors';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from "./layouts/GuestLayout";
import EditProfile from './Pages/EditProfile';

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
                path: '/Notifications',
                element: <Notifications />
            },
            {
                path: '/Profile',
                element: <Profile />
            },
            {
                path: '/Communities',
                element: <Communities />
            },
            {
                path: '/Articles',
                element: <Articles />
            },            
            {
                path: '/Videos',
                element: <Videos />
            },
            {
                path: '/Mentors',
                element: <Mentors />
            },

            {
                path: '/EditProfile',
                element: <EditProfile />
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