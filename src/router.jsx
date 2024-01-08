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
import AdminLayout from './layouts/AdminLayout';
import Users from "./Pages/Admin/Users";
import EditProfile from './Pages/EditProfile';
import EditUser from "./Pages/Admin/EditUser";
import AdminCommunities from "./Pages/Admin/AdminCommunities";
import AddCommunities from "./Pages/Admin/AddCommunities";
import Schedule from "./Pages/Schedule";
import AccountSettings from "./Pages/AccountSettings";
import EditCommunity from "./Pages/Admin/EditCommunity";
import AdminArticles from "./Pages/Admin/AdminArticles";
import AddArticle from "./Pages/Admin/AddArticle";
import AddVideo from "./Pages/Admin/AddVideo";
import AdminVideos from "./Pages/Admin/AdminVideos";
import EditArticle from "./Pages/Admin/EditArticle";
import Messages from "./Pages/Messages";
import EditVideo from "./Pages/Admin/EditVideo";
import ViewVideo from "./Pages/ViewVideo";
import ViewCommunity from "./Pages/ViewCommunity";
import ViewConversation from "./Pages/ViewConversation";

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
            {
                path: '/schedule',
                element: <Schedule />
            },
            {
                path: '/account-settings',
                element: <AccountSettings />
            },
            {
                path: '/messages',
                element: <Messages />
            },
            {
                path: '/v/:id',
                element: <ViewVideo />
            },
            {
                path: '/c/:id',
                element: <ViewCommunity />
            },
            {
                path: 'conversation/:id',
                element: <ViewConversation />
            }
            

        ],
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/Users'/>
            },
            {
                path: '/Users',
                element: <Users />
            },
            {
                path: '/edit-user/:id',
                element: <EditUser />
            },
            {
                path: '/admin-communities',
                element: <AdminCommunities />
            },
            {
                path: '/add-communities',
                element: <AddCommunities/>
            },
            {
                path: '/edit-community/:id',
                element: <EditCommunity/>
            },
            {
                path: '/admin-articles',
                element: <AdminArticles />
            },
            {
                path: 'add-article',
                element: <AddArticle />
            },
            {
                path: '/admin-videos',
                element: <AdminVideos />
            },
            {
                path: '/add-video',
                element: <AddVideo />
            },
            {
                path: '/edit-article/:id',
                element: <EditArticle />
            },
            {
                path: '/edit-video/:id',
                element: <EditVideo />
            }
            
        ]
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