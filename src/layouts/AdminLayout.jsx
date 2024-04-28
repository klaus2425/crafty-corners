import AdminNavbar from "../components/AdminNavbar";
import '../styles/index.scss'
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTableColumns, faUsers, faGroupArrowsRotate,
    faNewspaper, faFilm, faClipboard, faChalkboardUser,
    faFlag, faBoxArchive
} from '@fortawesome/free-solid-svg-icons'
import { useThemeContext } from "../context/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AdminFallback from "../components/AdminFallBack";

const AdminLayout = () => {
    const { user, token } = useStateContext();
    const { theme } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);


    if (!token) {
        return <Navigate to='./Landing' />;
    }
    const [active, setActive] = useState("1");

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
                            <Link to="/Users" onClick={handleClick}><FontAwesomeIcon icon={faUsers} /> Users</Link>
                            <Link to="/deactivated-users" onClick={handleClick}><FontAwesomeIcon icon={faUsers} /> Deactivated Users</Link>
                            <Link to="/admin-communities" onClick={handleClick}><FontAwesomeIcon icon={faGroupArrowsRotate} /> Communities</Link>
                            <Link to="/admin-articles" onClick={handleClick}><FontAwesomeIcon icon={faNewspaper} /> Articles</Link>
                            <Link to="/admin-videos" onClick={handleClick}><FontAwesomeIcon icon={faFilm} /> Videos</Link>
                            <a onClick={() => {
                                setIsOpen(!isOpen);
                            }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faFlag} /> Reports</a>
                            <div className={`collapsible ${isOpen ? 'open' : ''}`}>
                                <Link to="/reported-posts" onClick={handleClick}><FontAwesomeIcon icon={faClipboard} /> Posts</Link>
                                <Link to="/reported-comments" onClick={handleClick}><FontAwesomeIcon icon={faBoxArchive} /> Comments</Link>
                                <Link to="/reported-conversations" onClick={handleClick}><FontAwesomeIcon icon={faBoxArchive} /> Archived</Link>
                                <Link to="/reports/archives" onClick={handleClick}><FontAwesomeIcon icon={faBoxArchive} /> Archived</Link>

                            </div>
                            <Link to="/mentor-applicants" onClick={handleClick}><FontAwesomeIcon icon={faChalkboardUser} /> Mentors</Link>
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