import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));
const Notifications = lazy(() => import('./Pages/Notifications'));
const Profile = lazy(() => import('./Pages/Profile'));
const Messages = lazy(() => import('./Pages/Messages'));
const Schedule = lazy(() => import('./Pages/Schedule'));
const Communities = lazy(() => import('./Pages/Communities'));
const Articles = lazy(() => import('./Pages/Articles'));
const Videos = lazy(() => import('./Pages/Videos'));
const Mentors = lazy(() => import('./Pages/Mentors'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const GuestLayout = lazy(() => import('./layouts/GuestLayout'));
const AccountSettings = lazy(() => import("./Pages/AccountSettings"));
const AddArticle = lazy(() => import("./Pages/Admin/AddArticle"));
const AddCommunities = lazy(() => import("./Pages/Admin/AddCommunities"));
const AddVideo = lazy(() => import("./Pages/Admin/AddVideo"));
const AdminArticles = lazy(() => import("./Pages/Admin/AdminArticles"));
const AdminCommunities = lazy(() => import("./Pages/Admin/AdminCommunities"));
const AdminVideos = lazy(() => import("./Pages/Admin/AdminVideos"));
const EditArticle = lazy(() => import("./Pages/Admin/EditArticle"));
const EditCommunity = lazy(() => import("./Pages/Admin/EditCommunity"));
const EditUser = lazy(() => import("./Pages/Admin/EditUser"));
const EditVideo = lazy(() => import("./Pages/Admin/EditVideo"));
const MentorApplicants = lazy(() => import("./Pages/Admin/MentorApplicants"));
const ReportedPosts = lazy(() => import("./Pages/Admin/ReportedPosts"));
const ReportsArchived = lazy(() => import("./Pages/Admin/ReportsArchived"));
const Users = lazy(() => import("./Pages/Admin/Users"));
const ViewArchivedPost = lazy(() => import("./Pages/Admin/ViewArchivedPost"));
const ViewMentorApplication = lazy(() => import("./Pages/Admin/ViewMentorApplication"));
const ViewReportedPost = lazy(() => import("./Pages/Admin/ViewReportedPost"));
const Assessment = lazy(() => import("./Pages/Assessment"));
const EditProfile = lazy(() => import('./Pages/EditProfile'));
const HobbyistBadges = lazy(() => import("./Pages/HobbyistBadges"));
const HobbyistProfile = lazy(() => import("./Pages/HobbyistProfile"));
const Home = lazy(() => import('./Pages/Home'));
const Landing = lazy(() => import('./Pages/Landing'));
const MentorAddArticle = lazy(() => import("./Pages/MentorAddArticle"));
const MentorAddVideo = lazy(() => import("./Pages/MentorAddVideo"));
const MentorApplication = lazy(() => import("./Pages/MentorApplication"));
const NotFound = lazy(() => import('./Pages/NotFound'));
const NotVerified = lazy(() => import("./Pages/NotVerified"));
const PasswordReset = lazy(() => import("./Pages/PasswordReset"));
const PreAssessment = lazy(() => import("./Pages/PreAssessment"));
const UserBadges = lazy(() => import("./Pages/UserBadges"));
const Verify = lazy(() => import("./Pages/Verify"));
const ViewCommunity = lazy(() => import("./Pages/ViewCommunity"));
const ViewConversation = lazy(() => import("./Pages/ViewConversation"));
const ViewPost = lazy(() => import("./Pages/ViewPost"));
const ViewVideo = lazy(() => import("./Pages/ViewVideo"));

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