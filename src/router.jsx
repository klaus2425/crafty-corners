import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from './layouts/AdminLayout';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from "./layouts/GuestLayout";
import AccountSettings from "./Pages/AccountSettings";
import AddArticle from "./Pages/Admin/AddArticle";
import AddCommunities from "./Pages/Admin/AddCommunities";
import AddVideo from "./Pages/Admin/AddVideo";
import AdminArticles from "./Pages/Admin/AdminArticles";
import AdminCommunities from "./Pages/Admin/AdminCommunities";
import AdminVideos from "./Pages/Admin/AdminVideos";
import EditArticle from "./Pages/Admin/EditArticle";
import EditCommunity from "./Pages/Admin/EditCommunity";
import EditUser from "./Pages/Admin/EditUser";
import EditVideo from "./Pages/Admin/EditVideo";
import MentorApplicants from "./Pages/Admin/MentorApplicants";
import ReportedPosts from "./Pages/Admin/ReportedPosts";
import ReportsArchived from "./Pages/Admin/ReportsArchived";
import Users from "./Pages/Admin/Users";
import ViewArchivedPost from "./Pages/Admin/ViewArchivedPost";
import ViewMentorApplication from "./Pages/Admin/ViewMentorApplication";
import ViewReportedPost from "./Pages/Admin/ViewReportedPost";
import Articles from './Pages/Articles';
import Assessment from "./Pages/Assessment";
import Communities from './Pages/Communities';
import EditProfile from './Pages/EditProfile';
import HobbyistBadges from "./Pages/HobbyistBadges";
import HobbyistProfile from "./Pages/HobbyistProfile";
import Home from './Pages/Home';
import Landing from './Pages/Landing';
import MentorAddArticle from "./Pages/MentorAddArticle";
import MentorAddVideo from "./Pages/MentorAddVideo";
import MentorApplication from "./Pages/MentorApplication";
import Mentors from './Pages/Mentors';
import Messages from "./Pages/Messages";
import NotFound from './Pages/NotFound';
import Notifications from './Pages/Notifications';
import NotVerified from "./Pages/NotVerified";
import PasswordReset from "./Pages/PasswordReset";
import PreAssessment from "./Pages/PreAssessment";
import Profile from './Pages/Profile';
import Schedule from "./Pages/Schedule";
import UserBadges from "./Pages/UserBadges";
import Verify from "./Pages/Verify";
import Videos from './Pages/Videos';
import ViewCommunity from "./Pages/ViewCommunity";
import ViewConversation from "./Pages/ViewConversation";
import ViewPost from "./Pages/ViewPost";
import ViewVideo from "./Pages/ViewVideo";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/Home' />,
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
                path: '/edit-profile',
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
                path: 'conversation/:conversation_id',
                element: <ViewConversation />
            },
            {
                path: 'p/:id',
                element: <ViewPost />
            },
            {
                path: '/pre-assessment',
                element: <PreAssessment />
            },
            {
                path: '/not-verified',
                element: <NotVerified />
            },
            {
                path: '/mentor-application',
                element: <MentorApplication />
            },
            {
                path: '/u/:id',
                element: <HobbyistProfile />
            },
            {
                path: '/mentor/add-article',
                element: <MentorAddArticle />
            },
            {
                path: '/mentor/add-video',
                element: <MentorAddVideo />
            },
            {
                path: '/user-badges',
                element: <UserBadges />
            },
            {
                path: '/hobbyist-badges/:id',
                element: <HobbyistBadges />
            }

        ],
    },
    {
        path: '/assessment',
        element: <Assessment />
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/Users' />
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
                element: <AddCommunities />
            },
            {
                path: '/edit-community/:id',
                element: <EditCommunity />
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
            },
            {
                path: '/mentor-applicants/',
                element: <MentorApplicants />
            },
            {
                path: '/mentor-applicants/:id',
                element: <ViewMentorApplication />
            },
            {
                path: '/reported-posts/',
                element: <ReportedPosts />
            },
            {
                path: '/view-reported-post/:postId/:reportId',
                element: <ViewReportedPost />
            },
            {
                path: '/reports/archives',
                element: <ReportsArchived />,
            },
            {
                path: '/archived-post/:id',
                element: <ViewArchivedPost />
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/landing',
                element: <Landing />
            },
            {
                path: '/verify-email/:id/:hash',
                element: <Verify />
            },
            {
                path: '/reset-password',
                element: <PasswordReset />
            }
        ],
    },
    {
        path: '*',
        element: <NotFound />
    }

]);




export default router;