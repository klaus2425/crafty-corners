import {
    faBoxArchive,
    faChalkboardUser,
    faClipboard,
    faComments,
    faFilm,
    faFlag,
    faGroupArrowsRotate,
    faMessage,
    faNewspaper,
    faTableColumns, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, Navigate, Outlet } from "react-router-dom";
import AdminFallback from "../components/AdminFallBack";
import AdminNavbar from "../components/AdminNavbar";
import { useStateContext } from "../context/ContextProvider";
import { useThemeContext } from "../context/ThemeProvider";
import '../styles/index.scss';

const AdminLayout = () => {
    const { user, token } = useStateContext();
    const { theme } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);


    if (!token) {
        return <Navigate to='./Landing' />;
    }

    const handleClick = (ev) => {
        setActive(ev.target.id);
    }

    if (user.type === 'admin') {
        return (
            <div style={{ height: "100dvh" }} id={theme}>
                <Toaster
                    position="bottom-center"
                    duration='3000'
                    toastOptions={{
                        className: '',
                        duration: 5000,
                        style: {
                            borderRadius: "100px",
                            border: 0,
                            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
                        }
                    }}
                />
                <AdminNavbar />
                <div className="admin-dashboard">
                    <div className="dashboard-sidebar">
                        <span className="admin-header"> <FontAwesomeIcon icon={faTableColumns} /> ADMIN DASHBOARD</span>
                        <hr />
                        <div className="links">
                            <Link to="/Users" ><FontAwesomeIcon icon={faUsers} /> Users</Link>
                            <Link to="/deactivated-users" ><FontAwesomeIcon icon={faUsers} /> Deactivated Users</Link>
                            <Link to="/admin-communities" ><FontAwesomeIcon icon={faGroupArrowsRotate} /> Communities</Link>
                            <Link to="/admin-articles" ><FontAwesomeIcon icon={faNewspaper} /> Articles</Link>
                            <Link to="/admin-videos" ><FontAwesomeIcon icon={faFilm} /> Videos</Link>
                            <a onClick={() => {
                                setIsOpen(!isOpen);
                            }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faFlag} /> Reports</a>
                            <div className={`collapsible ${isOpen ? 'open' : ''}`}>
                                <Link to="/reported-posts" ><FontAwesomeIcon icon={faClipboard} /> Posts</Link>
                                <Link to="/reported-comments" ><FontAwesomeIcon icon={faComments} /> Comments</Link>
                                <Link to="/reported-conversations" ><FontAwesomeIcon icon={faMessage} /> Conversations</Link>
                                <Link to="/reports/archives" ><FontAwesomeIcon icon={faBoxArchive} /> Archived</Link>

                            </div>
                            <Link to="/mentor-applicants" ><FontAwesomeIcon icon={faChalkboardUser} /> Mentors</Link>
                        </div>
                    </div>
                    <div className="dashboard-right">
                        <div className="admin-container">
                            <div className="admin-container-card">
                                <Suspense fallback={<AdminFallback />}>
                                    <Outlet />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return <Navigate to='/' />;

}


export default AdminLayout;