import AdminNavbar from "../components/AdminNavbar";
import '../styles/index.scss'
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet, Link } from "react-router-dom";
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

    if (user.type === 'hobbyist' || user.type === 'mentor') {
        return <Navigate to='/' />
    }

    if (!token) {
        return <Navigate to='./Landing' />;
    }
    const [active, setActive] = useState("1");

    const handleClick = (ev) => {
        setActive(ev.target.id);
    }


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
                        <Link id="1" className={active === "1" ? "active" : undefined} to="/Users" onClick={handleClick}><FontAwesomeIcon icon={faUsers} /> Users</Link>
                        <Link id="2" className={active === "2" ? "active" : undefined} to="/admin-communities" onClick={handleClick}><FontAwesomeIcon icon={faGroupArrowsRotate} /> Communities</Link>
                        <Link id="3" className={active === "3" ? "active" : undefined} to="/admin-articles" onClick={handleClick}><FontAwesomeIcon icon={faNewspaper} /> Articles</Link>
                        <Link id="4" className={active === "4" ? "active" : undefined} to="/admin-videos" onClick={handleClick}><FontAwesomeIcon icon={faFilm} /> Videos</Link>
                        <a onClick={() => {
                            setIsOpen(!isOpen);
                        }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faFlag} /> Reports</a>
                        <div className={`collapsible ${isOpen ? 'open' : ''}`}>
                            <Link id="5" className={active === "5" ? "active" : undefined} to="/reported-posts" onClick={handleClick}><FontAwesomeIcon icon={faClipboard} /> Posts</Link>
                            <Link id="5" className={active === "5" ? "active" : undefined} to="/reports/archives" onClick={handleClick}><FontAwesomeIcon icon={faBoxArchive} /> Archived</Link>
                        </div>
                        <Link id="6" className={active === "6" ? "active" : undefined} to="/mentor-applicants" onClick={handleClick}><FontAwesomeIcon icon={faChalkboardUser} /> Mentors</Link>
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
}


export default AdminLayout;